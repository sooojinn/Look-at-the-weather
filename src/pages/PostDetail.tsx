import { useState, useEffect } from 'react';
import Header from '@components/common/Header';
import Text from '@components/common/atom/Text';
import Menu from '@components/icons/Menu';
import PostManageModal from '@components/common/molecules/PostManageModal';
import { usePostStore } from '@/store/postStore';
import { getPostDetail } from '@/api/apis';
import Heart from '@components/common/atom/Heart';
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

export default function PostDetail() {
  const postId = usePostStore((state) => state.postId);

  const [modalOpen, setModalOpen] = useState(false);
  const [postDetailData, setPostDetailData] = useState<PostDetail>();
  const modalHandler = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    const getPostDetailFunc = async () => {
      const response = await getPostDetail(postId);
      setPostDetailData(response.data);
    };

    getPostDetailFunc();
  }, [postId]);

  return (
    <div className="relative pb-10">
      <Header />
      <div className="px-5">
        <div className="flex justify-between items-center">
          <div className="my-2.5">
            <Text weight="bold">{postDetailData?.nickname}</Text>
            <Text color="gray">{`${postDetailData?.location.city} ${postDetailData?.location.district}`}</Text>
          </div>
          <div onClick={modalHandler}>
            <Menu />
          </div>
        </div>
      </div>
      <div>
        <img className="w-full h-[468px]" src={postDetailData?.images.image[0].url} />
      </div>
      <div className="px-5">
        <div className="flex gap-1.5 my-4 items-center">
          <Heart fill="gray" liked={postDetailData?.likeByUser} postId={postId} hasUserNumber={true} />
        </div>
        <div className="flex flex-col gap-4">
          <Text size="l" weight="bold">
            {postDetailData?.title}
          </Text>
          <Text color="lightBlack">{postDetailData?.content}</Text>
        </div>
        <div className="mt-2.5 mb-4">
          <Text color="gray">{postDetailData?.date}</Text>
        </div>
        <div className="flex flex-row p-5 bg-background-light rounded-[10px]">
          <div className="mr-5">
            <div className="flex flex-row gap-2.5">
              <Text>날씨</Text>
              <Text color="gray">흐림 맑음</Text>
            </div>
            <div className="flex flex-row gap-2.5">
              <Text>계절</Text>
              <Text color="gray">여름</Text>
            </div>
          </div>
          <div>
            <div className="flex flex-row gap-2.5">
              <Text>온도</Text>
              <Text color="gray">더워요 쌀쌀해요</Text>
            </div>
          </div>
        </div>
      </div>
      {modalOpen ? (
        <>
          <PostManageModal modalController={setModalOpen} option="M" postData={postDetailData} />
        </>
      ) : null}
    </div>
  );
}
