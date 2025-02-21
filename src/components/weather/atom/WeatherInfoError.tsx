import { TextColor } from '@/config/types';
import Text from '../../common/atom/Text';

export default function WeatherInfoError({ handleRefetch, color }: { handleRefetch: () => void; color?: TextColor }) {
  return (
    <>
      <Text size="2xl" weight="bold" color={color}>
        Error
      </Text>
      <div onClick={handleRefetch}>
        <Text size="s" color={color || 'gray'} weight="bold" className="underline cursor-pointer">
          재시도
        </Text>
      </div>
    </>
  );
}
