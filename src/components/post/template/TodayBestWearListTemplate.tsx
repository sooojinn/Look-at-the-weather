import { BASEURL } from '@/config/constants';
import TodayBestWearList from '../organism/TodayBestWearList';
import InitQuery from '@/components/provider/InitQuery';
import { fetchWithAuth } from '@/lib/fetcher';
import FetchErrorPlaceholder from '@/components/placeholder/FetchErrorPlaceholder';

export default async function TodayBestWearListTemplate() {
  try {
    const todayBestWearListData = await fetchWithAuth(`${BASEURL}/posts/top-liked`);

    return (
      <>
        <InitQuery queryKey={['post', 'list', 'topLikedPosts']} data={todayBestWearListData} />
        <TodayBestWearList />
      </>
    );
  } catch (e) {
    console.error('오늘의 베스트 코디 데이터 패칭 실패: ', e);
    return <FetchErrorPlaceholder />;
  }
}
