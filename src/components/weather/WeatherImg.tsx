interface WeatherImgProps {
  weatherType: string;
  width: number;
  height: number;
}

export default function WeatherImg({ weatherType, width, height }: WeatherImgProps) {
  const weatherImgSrc = `/weatherImages/${weatherType}.svg`;

  return (
    <div style={{ width: `${width}px`, height: `${height}px` }} className="flex justify-center items-center">
      <img src={weatherImgSrc} className="h-[80%] object-contain" />
    </div>
  );
}
