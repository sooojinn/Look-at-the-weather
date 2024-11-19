import { useState } from 'react';
import PostImg from './PostImg';

export default function ImageSlider({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const prevSlide = () => {
    if (currentIndex === 0) return;
    setCurrentIndex(currentIndex - 1);
  };

  const nextSlide = () => {
    if (currentIndex === images.length - 1) return;
    setCurrentIndex(currentIndex + 1);
  };

  // 공통으로 사용하는 슬라이드 이동 로직
  const handleMoveEnd = () => {
    if (touchStart === null || touchEnd === null) return;
    const swipeDistance = touchStart - touchEnd;

    // 50px 이상의 스와이프면 슬라이드 이동
    if (swipeDistance > 50) {
      nextSlide();
    } else if (swipeDistance < -50) {
      prevSlide();
    }

    // 초기화
    setTouchStart(null);
    setTouchEnd(null);
    setIsDragging(false);
  };

  // 터치 이벤트 핸들러
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleMoveEnd();
  };

  // 마우스 이벤트 핸들러
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setTouchStart(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setTouchEnd(e.clientX);
  };

  const handleMouseUp = () => {
    handleMoveEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) handleMoveEnd();
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {/* 슬라이드 이미지 표시 */}
      <div
        className="w-full h-full flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <PostImg key={index} imgUrl={image} />
        ))}
      </div>

      {/* 인디케이터 */}
      <div className="absolute bottom-4 w-full flex gap-1 justify-center">
        {images.map((_, index) => (
          <span
            key={index}
            className={`block w-1.5 h-1.5 rounded-full cursor-pointer ${
              index === currentIndex ? 'bg-white' : 'bg-opacity-white40'
            }`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}
