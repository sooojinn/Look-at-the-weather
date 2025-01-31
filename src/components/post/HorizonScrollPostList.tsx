import { SwiperSlide } from 'swiper/react';
import HorizonScrollList from '../common/molecules/HorizonScrollList';
import { v4 as uuidv4 } from 'uuid';
import PostItem from './PostItem';
import { PostMeta } from '@/config/types';

export default function HorizonScrollPostList({ postList }: { postList: PostMeta[] }) {
  return (
    <HorizonScrollList spaceBetween={4} slidesPerView={3}>
      {postList.map((post) => (
        <SwiperSlide key={uuidv4()}>
          <PostItem {...post} />
        </SwiperSlide>
      ))}
    </HorizonScrollList>
  );
}
