import CheckedBoxIcon from '../../icons/input/CheckBoxIcon';
import EmptyBoxIcon from '../../icons/input/EmptyBoxIcon';

interface CheckBoxBtnProps {
  isChecked: boolean;
  fill: string;
  className: string;
}

export default function CheckBoxBtn({ isChecked, fill, className }: CheckBoxBtnProps) {
  return <div className={className}>{isChecked ? <CheckedBoxIcon fill={fill} /> : <EmptyBoxIcon fill={fill} />}</div>;
}
