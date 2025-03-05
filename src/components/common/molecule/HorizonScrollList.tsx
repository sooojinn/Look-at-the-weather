import { Swiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

interface Props {
  children: React.ReactNode;
  spaceBetween: number;
  slidesPerView: number;
  padding?: string;
}

export default function HorizonScrollList({ children, spaceBetween, slidesPerView, padding = '0 20px' }: Props) {
  return (
    <div className="outer-container">
      <Swiper
        onSwiper={(swiper) => {
          swiper.el.style.padding = `${padding}`;
        }}
        className="inner-container"
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
      >
        {children}
      </Swiper>
    </div>
  );
}
