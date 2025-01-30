import StatusPlaceholder from '../common/organism/StatusPlaceholder';
import NoPostImg from '../icons/placeholders/NoPostImg';

export default function AllPostEmpty() {
  return (
    <StatusPlaceholder
      ImgComp={NoPostImg}
      boldMessage="내 지역에 올라온 룩이 아직 없어요"
      lightMessage={
        <>
          다른 지역의 룩을 먼저
          <br />
          둘러보시는 건 어떨까요?
        </>
      }
    />
  );
}
