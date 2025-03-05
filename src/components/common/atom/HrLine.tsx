export default function HrLine({ height }: { height: number }) {
  return <hr style={{ height: `${height}px` }} className="-mx-5 bg-line-lightest border-none flex-shrink-0" />;
}
