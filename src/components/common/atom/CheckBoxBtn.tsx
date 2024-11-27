import CheckedBoxIcon from '../../icons/input/CheckBoxIcon';
import EmptyBoxIcon from '../../icons/input/EmptyBoxIcon';

interface CheckBoxBtnProps {
  isChecked: boolean;
}

export default function CheckBoxBtn({ isChecked }: CheckBoxBtnProps) {
  const fill = 'rgb(var(--color-label-600))';
  return <div className="mr-2">{isChecked ? <CheckedBoxIcon fill={fill} /> : <EmptyBoxIcon fill={fill} />}</div>;
}
