import Text from '../atom/Text';

export default function ErrorMessage({ errors, name }) {
  return (
    <div className="mt-1 ml-1">
      {errors[name] && (
        <Text size="xs" color="error">
          {errors[name].message?.toString()}
        </Text>
      )}
    </div>
  );
}
