'use client';

import { useState } from 'react';
import Text from '@components/common/atom/Text';
import PostManageModal from '@/components/post/organism/PostManageModal';
import { Navigate } from 'react-router-dom';
import PostImgBlind from '@/components/post/atom/PostImgBlind';
import ImageSlider from '@/components/post/molecule/ImageSlider';
import { useAuthStore } from '@/store/authStore';
import { PostDetailType } from '@/config/types';
import TagsWithLabel from '@/components/post/molecule/TagsWithLabel';
import PostDetailHeader from '@/components/post/molecule/PostDetailHeader';
import PostHeart from '../organism/PostHeart';

export default function PostDetail({ postId, postData }: { postId: number; postData: PostDetailType }) {
  const [modalOpen, setModalOpen] = useState(false);

  const {
    nickname,
    location: postLocation,
    images,
    title,
    content,
    date,
    weatherTags = [],
    temperatureTags = [],
    seasonTag,
    likeByUser,
    likedCount,
    reportPost,
  }: PostDetailType = postData || {};

  const imgUrlList = images?.image.map((img) => img.url);

  const myNickName = useAuthStore((state) => state.nickName);
  const isMyPost = nickname === myNickName;

  const modalHandler = () => {
    setModalOpen(true);
  };

  if (typeof postId !== 'number') {
    return <Navigate to="/not-found" />;
  }

  return (
    <>
      <PostDetailHeader nickname={nickname} {...postLocation} modalHandler={modalHandler} />
      <div className="w-full h-full relative">
        {reportPost && <PostImgBlind textSize="l" textWeight="bold" />}
        <ImageSlider images={imgUrlList} />
      </div>
      <div className="p-5 pb-10 flex flex-col gap-4">
        <PostHeart
          fill="rgb(var(--color-label-600))"
          liked={likeByUser}
          postId={postId}
          hasUserNumber
          likedCount={likedCount}
        />
        <div className="flex flex-col gap-4">
          <Text size="l" weight="bold">
            {title}
          </Text>
          <div className="flex flex-col gap-2.5">
            <Text color="lightBlack">{content}</Text>
            <Text color="gray">{date}</Text>
          </div>
        </div>
        <div className="flex flex-col gap-2 px-3 py-3.5 bg-background-light rounded-[10px]">
          <div className="flex gap-5">
            <TagsWithLabel label="날씨">{...weatherTags}</TagsWithLabel>
            <TagsWithLabel label="계절">{seasonTag}</TagsWithLabel>
          </div>
          <div>
            <TagsWithLabel label="온도">{...temperatureTags}</TagsWithLabel>
          </div>
        </div>
      </div>

      {modalOpen ? (
        <PostManageModal
          modalController={setModalOpen}
          isMyPost={isMyPost}
          postId={postId}
          postData={postData}
          isReported={reportPost}
        />
      ) : null}
    </>
  );
}
