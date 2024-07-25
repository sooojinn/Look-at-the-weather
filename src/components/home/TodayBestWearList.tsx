export default function TodayBestWearList() {
  return (
    <div className="w-full max-w-md flex flex-col">
      <div className="w-full px-5 test-4 font-bold flex justify-start items-center bg-yellow-50 h-[60px]">
        <p>Today Best Wear</p>
      </div>
      <div className="w-full post-list">
        <div className="h-[312px] bg-green-100"></div>
        <div className="h-[312px] bg-green-100"></div>
        <div className="h-[312px] bg-green-100"></div>
        <div className="h-[312px] bg-green-100"></div>
      </div>
    </div>
  );
}
