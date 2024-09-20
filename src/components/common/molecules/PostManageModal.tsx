import { ReactNode, useEffect } from 'react';
import CloseBtn from '@components/icons/CloseBtn';
import ReportIcon from '@components/icons/ReportIcon';
import HideIcon from '@components/icons/HideIcon';
import DeleteIcon from '@components/icons/DeleteIcon';
import EditIcon from '@components/icons/EditIcon';
import Text from '../atom/Text';
import { deletePost, hidePost, reportPost } from '@/api/apis';
import { useNavigate } from 'react-router-dom';
import { PostDetail } from '@pages/PostDetail';
import { useMutation } from '@tanstack/react-query';
import { showToast } from './ToastProvider';

type ModalType = {
  modalController: React.Dispatch<React.SetStateAction<boolean>>;
  isMyPost?: boolean;
  postId: number;
  postData: PostDetail | undefined;
};

export default function PostManageModal({ modalController, isMyPost, postId, postData }: ModalType) {
  const navigate = useNavigate();

  console.log(postData);
  console.log('isMyPost: ', isMyPost);

  const hidePostMutation = useMutation({
    mutationFn: hidePost,
    onSuccess: () => {
      showToast('해당 게시물이 숨김 처리되었습니다.');
      navigate(-1);
    },
  });

  const onClickCloseBtn = () => {
    modalController(false);
  };

  const onClickDeleteBtn = async () => {
    try {
      const response = await deletePost(postId);
      alert(response.data.message);
      window.location.href = '/mypost';
    } catch (err) {
      console.log(err);
    }
    modalController(false);
  };

  const onClickUpdateBtn = async () => {
    navigate(`/post/${postId}/edit`, { state: { postData, postId } });

    modalController(false);
  };

  const onClickHideBtn = () => {
    hidePostMutation.mutate(postId);
  };

  const onClickReportBtn = () => {
    navigate(`/post/${postId}/report`, { state: { postId } });
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
      <div className="max-w-md fixed bottom-0 w-full bg-background-white rounded-t-3xl z-20">
        <div className="h-14 pr-5 flex justify-end">
          <CloseBtn onClick={onClickCloseBtn} />
        </div>
        <div className="pt-5 pb-10">
          {isMyPost ? (
            <>
              <PostMenuItem Icon={EditIcon} onClick={onClickUpdateBtn}>
                수정하기
              </PostMenuItem>
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
    </>
  );
}

interface PostMenuItemProps {
  children: ReactNode;
  Icon: React.ComponentType;
  onClick: () => void;
}

function PostMenuItem({ children, Icon, onClick }: PostMenuItemProps) {
  return (
    <div className="flex gap-3 px-5 py-3 items-center hover:bg-background-light cursor-pointer" onClick={onClick}>
      <Icon />
      <Text size="l">{children}</Text>
    </div>
  );
}
