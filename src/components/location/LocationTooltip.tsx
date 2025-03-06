import Text from '../common/atom/Text';
import CloseBtn from '../icons/CloseBtn';

export default function LocationTooltip({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex items-center">
      <div className="w-[8px] h-0 border-primary-main border-t-[3px] border-r-[5px] border-b-[3px] border-t-transparent border-l-transparent border-b-transparent"></div>
      <div className="flex items-center gap-1 px-3 py-[5px] bg-primary-main rounded-md z-10">
        <Text size="xs" color="white" className="whitespace-nowrap">
          클릭해서 위치를 변경할 수 있어요!
        </Text>
        <CloseBtn width={15} fill="white" onClick={onClose} />
      </div>
    </div>
  );
}
