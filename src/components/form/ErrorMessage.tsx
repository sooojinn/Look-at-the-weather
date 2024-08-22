import Text from '../common/atom/Text';
import { FieldErrors } from 'react-hook-form';

interface ErrorMessageProps {
  errors: FieldErrors<any>;
  name: string;
}

export default function ErrorMessage({ errors, name }: ErrorMessageProps) {
  const hasError = !!errors?.[name as string];
  return (
    <div className="mt-1 ml-1">
      <Text size="xs" color="error">
        {hasError && errors[name as string]?.message?.toString()}
      </Text>
    </div>
  );
}
