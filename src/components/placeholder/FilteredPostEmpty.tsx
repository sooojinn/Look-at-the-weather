import StatusPlaceholder from '../common/organism/StatusPlaceholder';
import NoPostImg from '../icons/placeholders/NoPostImg';

export default function FilteredPostEmpty() {
  return (
    <StatusPlaceholder
      ImgComp={NoPostImg}
      boldMessage="조건에 맞는 게시물이 없어요"
      lightMessage={
        <>
          더 넓은 범위로
          <br />
          검색해 보시는 건 어떨까요?
        </>
      }
    />
  );
}
