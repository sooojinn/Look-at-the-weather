'use client';

import { useState } from 'react';
import ReportIcon from '@components/icons/post-menu/ReportIcon';
import DeleteIcon from '@components/icons/post-menu/DeleteIcon';
import { deletePost, hidePost } from '@/api/apis';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { showToast } from '../molecules/ToastProvider';
import BackgroundShadow from './BackgroundShadow';
import PostMenuItem from '../molecules/PostMenuItem';
import ModalHeader from '../molecules/ModalHeader';
import HideIcon from '@components/icons/input/HideIcon';
import WriteIcon from '@components/icons/nav/WriteIcon';
import { usePostManageStore } from '@/store/postManageStore';
import { PostDetailType } from '@/config/types';
import DeleteWarningModal from '@/components/modal/DeleteWarningModal';
import HideWarningModal from '@/components/modal/HideWarningModal';

interface PostManageModalProps {
  modalController: React.Dispatch<React.SetStateAction<boolean>>;
  isMyPost?: boolean;
  postId: number;
  postData: PostDetailType | undefined;
  isReported?: boolean;
}

export default function PostManageModal({
  modalController,
  isMyPost,
  postId,
  postData,
  isReported,
}: PostManageModalProps) {
  const router = useRouter();
  const setPostData = usePostManageStore.getState().setPostData;

  const [showDeleteWarningModal, setShowDeleteWarningModal] = useState(false);
  const [showHideWarningModal, setShowHideWarningModal] = useState(false);

  const hidePostMutation = useMutation({
    mutationFn: hidePost,
    onSuccess: () => {
      showToast('해당 게시물이 숨김 처리되었습니다.');
      router.back();
    },
    onError: (error) => {
      showToast('게시물을 숨김 처리하는 데 실패했습니다.');
      modalController(false);
      console.error(error);
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      showToast('해당 게시물이 삭제되었습니다.');
      router.back();
    },
    onError: (error) => {
      console.error(error);
      showToast('게시물을 삭제하는 데 실패했습니다.');
      modalController(false);
    },
  });

  // 수정하기
  const onClickUpdateBtn = async () => {
    setPostData({
      postData: postData,
    });
    router.push(`/post/edit?id=${postId}`);
  };

  // 삭제하기
  const onClickDeleteBtn = async () => {
    setShowDeleteWarningModal(true);
  };

  // 숨기기
  const onClickHideBtn = () => {
    setShowHideWarningModal(true);
  };

  // 신고하기
  const onClickReportBtn = () => {
    router.push(`/post/report?id=${postId}`);
  };

  return (
    <>
      {!showDeleteWarningModal && !showHideWarningModal && (
        <BackgroundShadow>
          <div className="fixed bottom-0 w-full max-w-md bg-background-white rounded-t-3xl overflow-hidden">
            <ModalHeader onClose={() => modalController(false)}></ModalHeader>
            <div className="pt-5 pb-10">
              {isMyPost ? (
                <>
                  {isReported || (
                    <PostMenuItem Icon={WriteIcon} onClick={onClickUpdateBtn}>
                      수정하기
                    </PostMenuItem>
                  )}
                  <PostMenuItem Icon={DeleteIcon} onClick={onClickDeleteBtn}>
                    삭제하기
                  </PostMenuItem>
                </>
              ) : (
                <>
                  <PostMenuItem Icon={HideIcon} onClick={onClickHideBtn}>
                    해당 게시물 숨기기
                  </PostMenuItem>
                  <PostMenuItem Icon={ReportIcon} onClick={onClickReportBtn}>
                    신고하기
                  </PostMenuItem>
                </>
              )}
            </div>
          </div>
        </BackgroundShadow>
      )}
      {showDeleteWarningModal && (
        <DeleteWarningModal
          onCancel={() => {
            setShowDeleteWarningModal(false);
            modalController(false);
          }}
          onContinue={() => deletePostMutation.mutate(postId)}
        />
      )}
      {showHideWarningModal && (
        <HideWarningModal
          onCancel={() => {
            setShowHideWarningModal(false);
            modalController(false);
          }}
          onContinue={() => hidePostMutation.mutate(postId)}
        />
      )}
    </>
  );
}
