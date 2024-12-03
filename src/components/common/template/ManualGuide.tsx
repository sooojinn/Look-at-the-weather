import { useGuideManageStore } from '@/store/guideManageStore';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Text from '../atom/Text';
import 'swiper/css';
import 'swiper/css/pagination';
import CustomCarousel from '../organism/CustomCarousel';
import { guideContent } from '@/config/guideContent';

export default function ManualGuide() {
  const { isManualGuideModalOpen, setIsManualGuideModal } = useGuideManageStore();

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-opacity-black70 flex justify-center items-center z-50">
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
              <div className="absolute xs:top-[-5%] top-[-35px] w-full h-full flex justify-center items-center pointer-events-none">
                <img src={content.src} alt="" className="object-cover max-w-full max-h-full" />
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

        {/* <Swiper
          className="w-full swiper-container"
          modules={[Pagination]}
          slidesPerView={1}
          spaceBetween={50}
          pagination={true}
          navigation={true}
          loop={true}
        >
          {guideContent.map((content) => (
            <SwiperSlide className="relative bg-background-primary rounded-3xl" key={content.page}>
              <div className="absolute xs:top-[-5%] top-[-35px] w-full h-full flex justify-center items-center pointer-events-none">
                <img src={content.src} alt="" className="object-cover max-w-full max-h-full" />
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
        </Swiper> */}
        <div
          // className="absolute xs:top-[45vh] sm:top-[18vh] md:top-[15vh] lg:top-[20vh] top-[20vh]"
          className="absolute top-[600px] left-1/2 -translate-x-1/2 -translate-y-1/2"
          onClick={() => setIsManualGuideModal(!isManualGuideModalOpen)}
        >
          <Text color="white" weight="bold" className="underline">
            가이드 닫기
          </Text>
        </div>
        {/* <CustomCarousel config={guideContent} /> */}
      </div>
    </div>
  );
}
