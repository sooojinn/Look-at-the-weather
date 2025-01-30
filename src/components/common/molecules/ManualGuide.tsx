import { useGuideManageStore } from '@/store/guideManageStore';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Text from '../atom/Text';
import 'swiper/css';
import 'swiper/css/pagination';
import { guideContent } from '@/config/guideContent';
import Image from 'next/image';
import BackgroundShadow from '../organism/BackgroundShadow';

export default function ManualGuide() {
  const { isManualGuideModalOpen, setIsManualGuideModal } = useGuideManageStore();
  return (
    <BackgroundShadow>
      <div className="absolute top-10 flex flex-col text-center px-[36px] max-w-md w-full h-full mb-[10px]">
        <Swiper
          className="w-full swiper-container"
          modules={[Pagination]}
          slidesPerView={1}
          spaceBetween={50}
          pagination={{
            el: '.custom-pagination',
            clickable: true,
          }}
          navigation={true}
          loop={true}
        >
          {guideContent.map((content) => (
            <SwiperSlide className="relative bg-background-primary rounded-3xl" key={content.page}>
              <div className="absolute xs:top-[-5%] top-[35px] w-full h-full flex justify-center items-center pointer-events-none">
                <Image
                  src={content.src}
                  alt=""
                  width={500}
                  height={500}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="absolute bottom-0 w-full bg-white rounded-b-3xl px-[22px] pt-[35px] pb-[31px]">
                <div className="mb-3">
                  <Text size="l" weight="bold">
                    {content.title}
                  </Text>
                </div>
                <div>
                  <Text>{content.desc}</Text>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="custom-pagination mt-4"></div>
        <div
          className="absolute top-[600px] left-1/2 -translate-x-1/2 -translate-y-1/2"
          onClick={() => setIsManualGuideModal(!isManualGuideModalOpen)}
        >
          <Text color="white" weight="bold" className="underline cursor-pointer">
            가이드 닫기
          </Text>
        </div>
      </div>
    </BackgroundShadow>
  );
}
