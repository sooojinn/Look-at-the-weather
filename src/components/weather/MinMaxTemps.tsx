import Text from '@components/common/atom/Text';

interface MinMaxTempsProps {
  minTemp: number | null;
  maxTemp: number | null;
}

export default function MinMaxTemps({ minTemp, maxTemp }: MinMaxTempsProps) {
  return (
    <div className="mt-1">
      <Text>
        최고 {maxTemp}° / 최저 {minTemp}°
      </Text>
    </div>
  );
}
