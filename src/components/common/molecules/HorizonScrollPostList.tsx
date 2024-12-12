import { PostMeta } from '@/config/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { v4 as uuidv4 } from 'uuid';
import PostItem from '@components/post/PostItem';
import 'swiper/css';
import 'swiper/css/pagination';

interface PostListProps {
  postList: PostMeta[];
}

export default function HorizonScrollPostList({ postList }: PostListProps) {
  return (
    <div className="outer-container">
      <Swiper className="inner-container" spaceBetween={4} slidesPerView={3}>
        {postList.map((post) => (
          <SwiperSlide key={uuidv4()}>
            <PostItem isHorizontal={true} {...post} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
