type HeightTYpe = {
  height: number;
};

export function Line({ height }: HeightTYpe) {
  return <div className={`bg-line-lightest h-[${height}px]`} />;
}
