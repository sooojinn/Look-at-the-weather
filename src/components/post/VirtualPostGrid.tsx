import { useState, useRef, useEffect } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import PostItem from './PostItem';
import { PostMeta } from '@/config/types';

export default function VirtualPostGrid({ postList }: { postList: PostMeta[] }) {
  const columns = 2;
  const parentRef = useRef<HTMLDivElement>(null);
  const rowCount = Math.ceil(postList.length / columns);

  // 캐싱된 높이 상태 저장
  const [cachedRowHeight, setCachedRowHeight] = useState<number | null>(null);

  // 화면 크기 변경 감지 및 캐싱된 높이 초기화
  useEffect(() => {
    const handleResize = () => {
      setCachedRowHeight(null); // 화면 크기가 바뀌면 캐싱된 높이 무효화
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const gridVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => cachedRowHeight ?? 320, // 캐싱된 높이를 사용하거나 기본값 사용
    measureElement: (el) => {
      if (cachedRowHeight === null) {
        // 초기 측정 시 높이를 상태에 저장
        const height = el.getBoundingClientRect().height;
        setCachedRowHeight(height);
        return height;
      }
      return cachedRowHeight;
    },
    overscan: 1,
  });

  return (
    <div ref={parentRef} className="w-full h-screen overflow-auto scrollbar-hide relative">
      <div
        style={{
          height: `${gridVirtualizer.getTotalSize()}px`, // 가상화된 전체 높이
        }}
        className="w-full relative"
      >
        {gridVirtualizer.getVirtualItems().map((virtualRow) => {
          const rowIndex = virtualRow.index;
          const itemsInRow = postList.slice(rowIndex * columns, rowIndex * columns + columns);

          return (
            <div
              key={virtualRow.key}
              ref={(el) => {
                if (el) {
                  el.setAttribute('data-index', virtualRow.index.toString());
                  if (cachedRowHeight === null) {
                    // 높이가 캐싱되지 않았을 때만 측정
                    gridVirtualizer.measureElement(el);
                  }
                }
              }}
              style={{
                position: 'absolute',
                top: `${virtualRow.start}px`, // 줄의 시작 위치
                left: 0,
              }}
              className="w-full grid grid-cols-2 gap-[3px] pb-1"
            >
              {itemsInRow.map((post, colIndex) => (
                <div key={colIndex} className="w-full">
                  <PostItem {...post} />
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
