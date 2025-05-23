import Text from '../atom/Text';
import { GuideProps } from '@/config/types';

export default function GuideBtn({ Icon, title, upperDesc, lowerDesc }: GuideProps) {
  return (
    <div className={`relative flex border border-line-lighter rounded-[10px] px-2.5 py-4`}>
      <div className="flex flex-col gap-2">
        <Text weight="bold" size="l" className="relative z-10">
          {title}
        </Text>
        <div>
          <Text size="xs" color="gray" className="relative z-10">
            {upperDesc}
          </Text>
          <Text size="xs" color="gray" className="relative z-10">
            {lowerDesc}
          </Text>
        </div>
      </div>
      <div className="absolute right-0 bottom-0">
        <Icon />
      </div>
    </div>
  );
}
