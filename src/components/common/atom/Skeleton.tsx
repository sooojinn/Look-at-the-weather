export default function Skeleton({ className }: { className?: string }) {
  return <div className={`bg-lightGray opacity-30 rounded animate-pulse ${className}`}></div>;
}
