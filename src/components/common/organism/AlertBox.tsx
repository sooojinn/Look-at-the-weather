import WarningIcon from '@components/icons/WarningIcon';
import Text from '../atom/Text';
import Button from '../molecules/Button';

interface AlertBoxProps {
  mainMessage: string;
  subMessage: string;
  onCancel: () => void;
  onContinue: () => void;
}

export default function AlertBox({ mainMessage, subMessage, onCancel, onContinue }: AlertBoxProps) {
  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
      <div className="fixed inset-0 flex items-center justify-center z-20">
        <div className="w-[256px] h-[229px] p-6 flex flex-col justify-between bg-background-white rounded-xl z-20">
          <div className="flex flex-col items-center gap-4">
            <WarningIcon />
            <div className="flex flex-col items-center gap-[6px]">
              <Text size="l" color="black" weight="bold">
                {mainMessage}
              </Text>
              <Text color="gray">{subMessage}</Text>
            </div>
          </div>
          <div className="flex gap-2">
            <Button type="white" size="m" onClick={onCancel}>
              닫기
            </Button>
            <Button type="main" size="m" onClick={onContinue}>
              나가기
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
