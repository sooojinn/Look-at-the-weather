type HeightTYpe = {
  height: number;
};

export function Line({ height }: HeightTYpe) {
  return <div className={`bg-line-lightest h-[${height}px] absolute left-0 right-0`} />;
}
