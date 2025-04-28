import { BASEURL } from '@/config/constants';
import HomePostListTitle from '../atom/HomePostListTitle';
import TodayBestWearCriteriaBtn from './TodayBestWearCriteriaBtn';
import TodayBestWearList from './TodayBestWearList';
import InitQuery from '@/components/provider/InitQuery';

async function fetchTodayBestWearList() {
  const res = await fetch(`${BASEURL}/posts/top-liked`);

  if (!res.ok) throw new Error('Failed to fetch posts');

  return res.json();
}

export default async function TodayBestWearListWithTitle() {
  const todayBestWearListData = await fetchTodayBestWearList();

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
