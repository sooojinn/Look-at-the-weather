import guide1 from '/assets/guide1.png';
import guide2 from '/assets/guide2.png';
import guide3 from '/assets/guide3.png';
import guide4 from '/assets/guide4.png';
import { GuideContent } from './types';

export const guideContent: GuideContent[] = [
  {
    page: 1,
    title: (
      <>
        룩엣더웨더(Look At The Weather) 는
        <br />
        무슨 서비스 인가요?
      </>
    ),
    desc: (
      <>
        오늘의 룩을 공유하고 이를 통해
        <br />
        <strong>날씨에 어울리는 룩을 참고</strong>할 수 있는
        <br />
        <strong>지역 날씨 기반 패션 플랫폼</strong>입니다.
      </>
    ),
    src: guide1,
  },
  {
    page: 2,
    title: <>메인 서비스 한눈에 둘러보기</>,
    desc: (
      <>
        메인에서 <strong>현재 지역의 날씨</strong>와
        <br />
        <strong>기온별 룩 가이드</strong>를 확인할 수 있어요.
        <br />
        오늘의 룩을 <strong>투데이 베스트 웨어</strong>를 보고
        <br />
        참고해 보세요!
      </>
    ),
    src: guide2,
  },
  {
    page: 3,
    title: <>내가 원하는 조건의 룩만 보고 싶다면?</>,
    desc: (
      <>
        지역명을 클릭해 지역을 변경하거나
        <br />
        상단의 <strong>필터 기능</strong>을 통해 내가 보고 싶은
        <br />
        지역과 조건의 룩만 볼 수 있어요
      </>
    ),
    src: guide3,
  },
  {
    page: 4,
    title: (
      <>
        마음에 드는 룩이 있다면
        <br />
        간편하게 저장
      </>
    ),
    desc: (
      <>
        마음에 드는 룩이 있다면{' '}
        <strong>
          하트를 눌러
          <br />
          간편하게 저장하세요!{' '}
        </strong>
        저장한 룩은
        <br />
        언제든 마이페이지에서 확인할 수 있어요
      </>
    ),
    src: guide4,
  },
];
