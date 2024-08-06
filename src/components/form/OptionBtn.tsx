import Text from '@components/common/atom/Text';

interface OptionBtnProps {
  option: string;
  selected: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function OptionBtn({ option, selected, onClick }: OptionBtnProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 border border-line-lightest rounded-[19px] transition-colors duration-200 ${
        selected ? 'border-primary-lightest text-primary-lightest' : ''
      }`}
    >
      <Text color="gray">{option}</Text>
    </button>
  );
}
