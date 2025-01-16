import { TextColor } from '@/config/types';
import Text from '@components/common/atom/Text';

interface MinMaxTempsProps {
  minTemp: number | null;
  maxTemp: number | null;
  color?: TextColor;
}

export default function MinMaxTemps({ minTemp, maxTemp, color }: MinMaxTempsProps) {
  return (
    <Text color={color}>
      최고 {maxTemp}° &nbsp;|&nbsp; 최저 {minTemp}°
    </Text>
  );
}
