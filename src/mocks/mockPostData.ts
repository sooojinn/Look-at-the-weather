// 모의 데이터 생성 함수
export const generateMockPosts = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    postId: index + 1,
    thumbnail:
      'https://img3.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202210/12/kncom/20221012135123984gqor.png',
    location: `Location ${index + 1}`,
    SeasonTag: ['봄', '여름', '가을', '겨울'][Math.floor(Math.random() * 4)],
    WeatherTag: ['맑음', '흐림', '비', '눈'].slice(0, Math.floor(Math.random() * 3) + 1),
    TempTag: ['따뜻해요', '쌀쌀해요', '더워요', '추워요'].slice(0, Math.floor(Math.random() * 3) + 1),
    likeByUser: Math.random() > 0.5,
  }));
};
