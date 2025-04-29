import { BASEURL } from '@/config/constants';
import HomePostListTitle from '../atom/HomePostListTitle';
import TodayBestWearCriteriaBtn from './TodayBestWearCriteriaBtn';
import TodayBestWearList from './TodayBestWearList';
import InitQuery from '@/components/provider/InitQuery';
import { fetchWithAuth } from '@/lib/fetcher';

export default async function TodayBestWearListWithTitle() {
  const todayBestWearListData = await fetchWithAuth(`${BASEURL}/posts/top-liked`);

  return (
    <div>
      <HomePostListTitle>
        오늘의 베스트 룩
        <TodayBestWearCriteriaBtn />
      </HomePostListTitle>
      <InitQuery queryKey={['post', 'list', 'topLikedPosts']} data={todayBestWearListData} />
      <TodayBestWearList />
    </div>
  );
}
