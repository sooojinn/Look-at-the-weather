import { AlertModalFunc } from '@/config/types';
import Button from '../common/molecules/Button';
import AlertModal from '../common/organism/AlertModal';

export default function TodayBestWearCriteriaModal({ onContinue }: AlertModalFunc) {
  return (
    <AlertModal
      boldMessage={
        <>
          Today Best Wear
          <br />
          선정 기준
        </>
      }
      regularMessage={
        <>
          오늘 좋아요를 많이 받은
          <br />
          게시물순으로 선정됩니다.
        </>
      }
      buttons={
        <>
          <Button size="m" type="main" onClick={onContinue}>
            확인
          </Button>
        </>
      }
    />
  );
}
