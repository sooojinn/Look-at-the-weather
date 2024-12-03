// import { useState } from 'react';
// import { GuideContent } from '@/config/types';
// import Text from '../atom/Text';

// const CustomCarousel = ({ config }: GuideContent) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [startX, setStartX] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);

//   // 스크롤/터치 시작 이벤트
//   const handleTouchStart = (e) => {
//     setStartX(e.touches ? e.touches[0].clientX : e.clientX);
//     setIsDragging(true);
//   };

//   // 스크롤/터치 이동 이벤트
//   const handleTouchMove = (e) => {
//     if (!isDragging) return;

//     const currentX = e.touches ? e.touches[0].clientX : e.clientX;
//     const diff = startX - currentX;

//     // 일정 거리 이상 스와이프 시 슬라이드 전환
//     if (Math.abs(diff) > 50) {
//       if (diff > 0) {
//         // 오른쪽으로 스와이프 (다음 슬라이드)
//         setCurrentIndex((prevIndex) => (prevIndex + 1 === config.length ? 0 : prevIndex + 1));
//       } else {
//         // 왼쪽으로 스와이프 (이전 슬라이드)
//         setCurrentIndex((prevIndex) => (prevIndex === 0 ? config.length - 1 : prevIndex - 1));
//       }
//       setIsDragging(false);
//     }
//   };

//   // 스크롤/터치 종료 이벤트
//   const handleTouchEnd = () => {
//     setIsDragging(false);
//   };

//   // 불렛 클릭 시 해당 슬라이드로 이동
//   const goToSlide = (index: number) => {
//     setCurrentIndex(index);
//   };

//   return (
//     <div
//       className="relative w-full max-w-xl mx-auto select-none"
//       onTouchStart={handleTouchStart}
//       onTouchMove={handleTouchMove}
//       onTouchEnd={handleTouchEnd}
//       onMouseDown={handleTouchStart}
//       onMouseMove={handleTouchMove}
//       onMouseUp={handleTouchEnd}
//       onMouseLeave={handleTouchEnd}
//     >
//       {/* 슬라이드 컨테이너 */}
//       <div className="overflow-hidden relative w-full h-full">
//         <div
//           className="flex transition-transform duration-500 ease-in-out active:cursor-grabbing"
//           style={{
//             transform: `translateX(-${currentIndex * 100}%)`,
//             width: `${config.length * 100}%`,
//           }}
//         >
//           {config.map((content, index) => (
//             <div key={index} className="flex flex-col text-start w-[100%] flex-shrink-0">
//               <div className="bg-main">
//                 <img src={content.src} />
//               </div>
//               <div className="bg-white absolute w-1/2">
//                 <div className="mb-3">
//                   <Text size="l" weight="bold">
//                     {content.title}
//                   </Text>
//                 </div>
//                 <div>
//                   <Text>{content.desc}</Text>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* 불렛 인디케이터 */}
//       <div className="flex justify-center mt-4 space-x-2">
//         {config.map((content, index) => (
//           <button
//             key={index}
//             onClick={() => {
//               goToSlide(content.page - 1);
//             }}
//             className={`
//               w-3 h-3 rounded-full
//               ${currentIndex + 1 === content.page ? 'bg-blue-600' : 'bg-white'}
//             `}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CustomCarousel;
