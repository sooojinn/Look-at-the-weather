import Text from '@components/common/atom/Text';
import Label from './Label';
import File from './File';

interface FileWithLabelProps {
  label: string;
  description: string;
}

export default function FileWithLabel({ label, description }: FileWithLabelProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Label size="l">{label}</Label>
        <Text size="s" color="lightGray">
          {description}
        </Text>
      </div>
      <File />
    </div>
  );
}
