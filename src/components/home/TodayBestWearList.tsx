import axios from 'axios';
import { BASEURL } from '@/config/constants';
import { useEffect, useState } from 'react';

interface PostMeta {
  postId: number;
  thumbnail: string;
  location: string;
  SeasonTag: string;
  WeatherTag: string[];
  TempTag: string[];
  likeByUser: boolean;
}

const getBestPostList = async (page: number, size: number): Promise<PostMeta[]> => {
  const response = await axios.get<PostMeta[]>(`${BASEURL}/api/v1/posts/liked`, {
    params: { page, size },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  return response.data;
};

export default function TodayBestWearList() {
  const [postList, setPostList] = useState<PostMeta[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const nextPostList = await getBestPostList(0, 10); // 첫 페이지, 10개 항목
        setPostList(nextPostList);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="w-full max-w-md flex flex-col">
      <div className="w-full px-5 font-B flex justify-start items-center h-[60px]">
        <p>Today Best Wear 👕</p>
      </div>
      {postList && <PostList postList={postList} />}
    </div>
  );
}

interface PostListProps {
  postList: PostMeta[];
}

export function PostList({ postList }: PostListProps) {
  return (
    <div className="w-full post-list">
      {postList.map((post) => {
        const tags = [...post.WeatherTag, ...post.TempTag, post.SeasonTag];
        return (
          <div className="min-h-[312px] h-auto" key={post.postId}>
            <img src={post.thumbnail} className="w-full h-[232px] object-cover" alt="thumbnail" />
            <div className="mt-2.5 px-5">
              <div className="text-m">{post.location}</div>
              <div>
                {tags.map((tag, index) => (
                  <span key={index} className="inline-block h-auto mr-2 text-s text-gray">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
