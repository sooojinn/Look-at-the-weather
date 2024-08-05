interface WeatherImgProps {
  weatherType: string;
  width: number;
  height: number;
}

export default function WeatherImg({ weatherType, width, height }: WeatherImgProps) {
  const weatherImgSrc = `/weatherImages/${weatherType}.svg`;
  const widthStyle = `w-[${width}px]`;
  const heightStyle = `h-[${height}px]`;

  return (
    <div className={`${widthStyle} ${heightStyle} flex justify-center items-center`}>
      <img src={weatherImgSrc} className="h-[80%] object-contain" />
    </div>
  );
}
