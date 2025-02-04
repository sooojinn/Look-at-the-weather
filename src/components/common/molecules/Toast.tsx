import Text from '../atom/Text';

export default function Toast({
  message,
  cancelBtnText,
  onClose,
}: {
  message: string;
  cancelBtnText: string;
  onClose: () => void;
}) {
  return (
    <div className="w-full flex justify-between items-center">
      <Text size="s" color="white">
        {message}
      </Text>
      {cancelBtnText && (
        <button onClick={onClose} className="underline text-s font-bold ml-2 whitespace-nowrap">
          {cancelBtnText}
        </button>
      )}
    </div>
  );
}
