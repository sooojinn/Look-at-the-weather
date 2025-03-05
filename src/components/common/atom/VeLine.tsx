export default function VeLine({ height }: { height: number }) {
  return <hr style={{ height: `${height}px` }} className="w-[1px] border-none bg-line-lightest" />;
}
