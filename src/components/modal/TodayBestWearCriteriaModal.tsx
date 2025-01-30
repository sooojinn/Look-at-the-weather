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
          당일 게시물 중 좋아요를
          <br />
          많이 받은 게시물 기준으로 선정됩니다.
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
