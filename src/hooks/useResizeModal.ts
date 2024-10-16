import { useEffect, useState } from 'react';

interface ResizeModalProps {
  minHeight: number;
  maxHeight: number;
  defaultHeight: number;
}

export default function useResizeModal({ minHeight, maxHeight, defaultHeight }: ResizeModalProps) {
  const [modalHeight, setModalHeight] = useState(defaultHeight);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentHeight, setCurrentHeight] = useState(modalHeight);

  const handleStart = (clientY: number) => {
    setIsDragging(true);
    setStartY(clientY);
    setCurrentHeight(modalHeight);
  };

  const handleMove = (clientY: number) => {
    if (isDragging) {
      const diffY = clientY - startY; // 이동 거리 계산
      const newHeight = currentHeight - diffY; // 드래그 방향에 따라 높이 조절

      // 최소 및 최대 높이 설정
      if (newHeight > minHeight && newHeight < maxHeight) {
        setModalHeight(newHeight);
      }
    }
  };

  const handleEnd = () => {
    setIsDragging(false); // 드래그 종료
  };

  // 마우스 이벤트 핸들러
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    handleStart(e.clientY);
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleMove(e.clientY);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // 터치 이벤트 핸들러
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    handleStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e: TouchEvent) => {
    handleMove(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  return { modalHeight, handleMouseDown, handleTouchStart };
}
