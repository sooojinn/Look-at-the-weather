import { HrLineHeight } from '@/config/types';

export default function HrLine({ height }: HrLineHeight) {
  const hrHeight = height === 1 ? 'border-[1px]' : 'border-4';
  return <hr className={`-mx-5 bg-gray-200 ${hrHeight} border-line-lightest`} />;
}
