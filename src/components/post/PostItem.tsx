'use client';

import { PostMeta } from '@/config/types';
import PostImg from './PostImg';
import Text from '@components/common/atom/Text';
import Tags from './Tags';
import Heart from '@components/common/atom/Heart';
import PostImgBlind from './PostImgBlind';
import Link from 'next/link';

export default function PostItem({ ...post }: PostMeta) {
  const {
    postId,
    thumbnail,
    likeByUser,
    location: { city, district },
    weatherTags,
    temperatureTags,
    seasonTag,
    reportPost: isReported,
  } = post;

  const tags = [...(weatherTags || []), ...(temperatureTags || []), seasonTag || ''];

  return (
    <Link href={`/post?id=${postId}`} className="cursor-pointer">
      <div className="relative">
        {isReported && <PostImgBlind />}
        <PostImg imgUrl={thumbnail} />
        <div className="absolute right-3 bottom-3">
          <Heart liked={likeByUser} postId={postId} />
        </div>
      </div>
      <div style={{ paddingInline: '9%' }} className="my-2.5">
        <Text>
          {city} {district}
        </Text>
        <Tags tags={tags} />
      </div>
    </Link>
  );
}
