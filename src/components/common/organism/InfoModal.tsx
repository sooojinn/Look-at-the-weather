import Text from '../atom/Text';
import Button from '../molecules/Button';

interface InfoModalProps {
  message: string;
  onClose: () => void;
}

export default function InfoModal({ message, onClose }: InfoModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="bg-white p-6 flex flex-col gap-6 rounded-lg">
        <Text color="black">{message}</Text>
        <Button size="m" onClick={onClose}>
          확인
        </Button>
      </div>
    </div>
  );
}
