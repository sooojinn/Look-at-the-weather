import StatusPlaceholder from '@/components/placeholder/StatusPlaceholder';
import NotFoundImg from '@components/icons/placeholders/NotFoundImg';

export default function FetchErrorPlaceholder() {
  return (
    <StatusPlaceholder
      ImgComp={NotFoundImg}
      boldMessage="요청 실패"
      lightMessage="데이터를 불러오는 데 실패했습니다."
    />
  );
}
