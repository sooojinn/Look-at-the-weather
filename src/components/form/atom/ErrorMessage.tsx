import ExclamationMarkIcon from '@components/icons/ExclamationMarkIcon';
import Text from '../../common/atom/Text';
import { FieldErrors, FieldValues } from 'react-hook-form';

interface ErrorMessageProps<T extends FieldValues> {
  errors: FieldErrors<T>;
  name: string;
}

export default function ErrorMessage<T extends FieldValues>({ errors, name }: ErrorMessageProps<T>) {
  const hasError = !!errors?.[name as string];
  return (
    <div className="flex gap-1 items-center ml-1">
      <ExclamationMarkIcon width={12} fill="rgb(var(--color-error))" />
      <Text size="xs" color="error">
        {hasError && errors[name as string]?.message?.toString()}
      </Text>
    </div>
  );
}
