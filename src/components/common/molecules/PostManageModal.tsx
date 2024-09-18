import { useEffect } from 'react';
import CloseBtn from '@components/icons/CloseBtn';
import ReportIcon from '@components/icons/ReportIcon';
import HideIcon from '@components/icons/HideIcon';
import DeleteIcon from '@components/icons/DeleteIcon';
import EditIcon from '@components/icons/EditIcon';
import Text from '../atom/Text';
import { deletePost } from '@/api/apis';
import { usePostStore } from '@/store/postStore';
import { useNavigate } from 'react-router-dom';
import { PostMeta } from '@/config/types';

interface PostDetail extends PostMeta {
  nickname: string;
  date: string;
  title: string;
  content: string;
  images: {
    image: [imageId: number, url: string];
  };
  likedCount: number;
  reportPost: boolean;
}

type ModalType = {
  modalController: React.Dispatch<React.SetStateAction<boolean>>;
  option?: string;
  postData: PostDetail;
};

export default function PostManageModal({ modalController, option, postData }: ModalType) {
  const navigate = useNavigate();
  const postId = usePostStore((state) => state.postId);

  console.log(postData);
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

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
      <div className={'max-w-md fixed bottom-0 w-full bg-white shadow-md z-20 h-[212px]'}>
        <div className="bg-background-white w-full px-5 pt-4 pb-10 rounded-t-3xl">
          <div className="flex justify-end mb-9">
            <CloseBtn onClick={onClickCloseBtn} />
          </div>
          <div>
            {option && option === 'M' ? (
              <div>
                <div className="flex gap-3 py-3 items-center" onClick={onClickUpdateBtn}>
                  <EditIcon />
                  <Text size="l">수정하기</Text>
                </div>
                <div className="flex gap-3 py-3 items-center" onClick={onClickDeleteBtn}>
                  <DeleteIcon />
                  <Text size="l">삭제하기</Text>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex gap-3 p-3 py-3 items-center">
                  <HideIcon />
                  <Text size="l">해당 게시물 숨기기</Text>
                </div>
                <div className="flex gap-3 p-3 py-3 items-center">
                  <ReportIcon />
                  <Text size="l">신고하기</Text>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
