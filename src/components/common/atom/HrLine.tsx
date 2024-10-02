export default function HrLine({ height }: number) {
  return (
    <>
      {height === 1 ? (
        <hr className={`-mx-5 bg-gray-200 border-line-lightest`} />
      ) : (
        <hr className={`-mx-5 bg-gray-200 border-[4px] border-line-lightest`} />
      )}
    </>
  );
}
