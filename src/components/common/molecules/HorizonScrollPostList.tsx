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
    <div className="">
      <Swiper spaceBetween={4} slidesPerView={3}>
        {postList.map((post) => (
          <SwiperSlide>
            <PostItem isHorizontal={true} key={uuidv4()} {...post} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
