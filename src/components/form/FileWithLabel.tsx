import Text from '@components/common/atom/Text';
import Label from './Label';
import File from './File';
import { UseFormSetValue } from 'react-hook-form';
import { PostFormData } from '@/config/types';

interface FileWithLabelProps {
  label: string;
  description: string;
  required?: boolean;
  setValue: UseFormSetValue<PostFormData>;
}

export default function FileWithLabel({ label, description, required = false, setValue }: FileWithLabelProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Label size="l" required={required}>
          {label}
        </Label>
        <Text size="s" color="lightGray">
          {description}
        </Text>
      </div>
      <File setValue={setValue} />
    </div>
  );
}
