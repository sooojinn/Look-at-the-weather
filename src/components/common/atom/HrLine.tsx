export default function HrLine(height: number) {
  const hrHeight = height === 1 ? 'border-[1px]' : 'border-4';
  return <hr className={`-mx-5 bg-gray-200 ${hrHeight} border-line-lightest`} />;
}
