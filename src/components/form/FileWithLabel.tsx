import Text from '@components/common/atom/Text';
import Label from './Label';

interface FileWithLabelProps {
  label: string;
  description: string;
}

export default function FileWithLabel({ label, description }: FileWithLabelProps) {
  return (
    <>
      <div className="flex flex-col gap-1">
        <Label size="l">{label}</Label>
        <Text size="s" color="lightGray">
          {description}
        </Text>
      </div>
    </>
  );
}
