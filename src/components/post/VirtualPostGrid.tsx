import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import PostItem from './PostItem';
import { PostMeta } from '@/config/types';

export default function VirtualPostGrid({ postList }: { postList: PostMeta[] }) {
  const columns = 2;
  const parentRef = useRef<HTMLDivElement>(null);
  const rowCount = Math.ceil(postList.length / columns);

  const gridVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 320, // 초기 추정 높이
    measureElement: (el) => el.getBoundingClientRect().height, // 실제 높이를 측정
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
          // 현재 렌더링 중인 줄(row) 번호
          const rowIndex = virtualRow.index;

          // 현재 줄에 포함된 요소들 계산
          const itemsInRow = postList.slice(rowIndex * columns, rowIndex * columns + columns);

          return (
            <div
              key={virtualRow.key}
              ref={(el) => {
                if (el) {
                  el.setAttribute('data-index', virtualRow.index.toString());
                  gridVirtualizer.measureElement(el); // 요소의 실제 높이를 측정
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
