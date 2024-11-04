interface WeatherImgProps {
  weatherType: string;
  height?: number;
}

export default function WeatherImg({ weatherType, height }: WeatherImgProps) {
  const weatherImgSrc = `/weatherImages/${weatherType}.svg`;

  return (
    <div className="flex justify-end">
      <img
        src={weatherImgSrc}
        style={{ height: `${height}px` }}
        className="h-[80%] object-contain"
        alt={`${weatherType}`}
      />
    </div>
  );
}
