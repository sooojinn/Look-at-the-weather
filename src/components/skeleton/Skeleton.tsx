export default function Skeleton({ fontSize, className = '' }: { fontSize?: number; className?: string }) {
  const skeletonClassName = `bg-lightGray opacity-30 rounded animate-pulse ${className}`;

  return fontSize ? (
    <div style={{ height: `${fontSize * 1.5}px` }} className="flex items-center">
      <div style={{ height: `${fontSize}px` }} className={skeletonClassName}></div>
    </div>
  ) : (
    <div className={skeletonClassName}></div>
  );
}
