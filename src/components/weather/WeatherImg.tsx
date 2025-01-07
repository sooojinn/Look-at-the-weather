interface WeatherImgProps {
  weatherType: string;
  height?: number;
}

export default function WeatherImg({ weatherType, height }: WeatherImgProps) {
  const weatherImgSrc = `/weatherImages/${weatherType}.svg`;

  return (
    <div className="flex justify-end" style={{ height: `${height}px` }}>
      <img src={weatherImgSrc} className="object-contain" alt={`${weatherType}`} />
    </div>
  );
}
