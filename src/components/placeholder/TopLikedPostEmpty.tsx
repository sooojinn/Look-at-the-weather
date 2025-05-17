import StatusPlaceholder from './StatusPlaceholder';
import NoPostImg from '../icons/placeholders/NoPostImg';

export default function TopLikedPostEmpty() {
  return (
    <StatusPlaceholder
      ImgComp={NoPostImg}
      boldMessage="오늘의 베스트 룩이 아직 선정되지 않았어요"
      lightMessage={
        <>
          맘에 드는 게시물에 좋아요를 눌러 직접
          <br /> 베스트 룩을 뽑아보세요!
        </>
      }
      size="m"
    />
  );
}
