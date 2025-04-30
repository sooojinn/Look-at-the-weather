import HomePostListTitle from '../atom/HomePostListTitle';
import TodayBestWearCriteriaBtn from '../organism/TodayBestWearCriteriaBtn';
import TodayBestWearListTemplate from './TodayBestWearListTemplate';

export default function TodayBestWearListWithTitle() {
  return (
    <div>
      <HomePostListTitle>
        오늘의 베스트 룩
        <TodayBestWearCriteriaBtn />
      </HomePostListTitle>
      <TodayBestWearListTemplate />
    </div>
  );
}
