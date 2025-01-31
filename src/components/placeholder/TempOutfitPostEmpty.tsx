import StatusPlaceholder from './StatusPlaceholder';
import NoPostImg from '../icons/placeholders/NoPostImg';

export default function TempOutfitPostEmpty() {
  return (
    <StatusPlaceholder
      ImgComp={NoPostImg}
      boldMessage={'이 기온에 적합한 게시글이 없어요.'}
      lightMessage={'스타일을 공유하여 다른 사람들에게 도움이 되어 주세요!'}
    />
  );
}
