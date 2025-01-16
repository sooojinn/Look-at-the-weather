import { PostMeta } from '@/config/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { v4 as uuidv4 } from 'uuid';
import PostItem from '@components/post/PostItem';
import 'swiper/css';
import 'swiper/css/pagination';

interface PostListProps {
  postList: PostMeta[];
  padding?: string;
}

export default function HorizonScrollPostList({ postList, padding }: PostListProps) {
  return (
    <div className="outer-container">
      <Swiper
        onSwiper={(swiper) => {
          swiper.el.style.padding = `${padding}`;
        }}
        className="inner-container"
        spaceBetween={4}
        slidesPerView={3}
      >
        <div className="px-5">
          {postList.map((post) => (
            <SwiperSlide key={uuidv4()}>
              <PostItem isHorizontal={true} {...post} />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
}
