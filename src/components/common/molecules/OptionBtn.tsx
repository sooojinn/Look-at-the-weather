import Text from '@components/common/atom/Text';
import CloseBtn from '@components/icons/CloseBtn';

interface OptionBtnProps {
  id?: string;
  name: string;
  isActive: boolean;
  showCloseBtn?: boolean;
  onClickFunc: () => void;
}

export default function OptionBtn({ id, name, isActive, showCloseBtn, onClickFunc }: OptionBtnProps) {
  return (
    <div
      id={id}
      className={`border transition-colors duration-200 ${
        isActive ? 'border-primary-main' : 'border-line-lightest'
      } rounded-[19px] px-3 py-2 h-[32px] bg-background-white flex gap-1 items-center flex-shrink-0 cursor-pointer`}
      onClick={showCloseBtn ? () => {} : onClickFunc}
    >
      <Text color={isActive ? 'main' : 'gray'} weight={isActive ? 'bold' : 'regular'}>
        {name}
      </Text>
      {showCloseBtn ? (
        <div>
          <CloseBtn width={16} onClick={onClickFunc} fill="#1769ff" />
        </div>
      ) : null}
    </div>
  );
}
