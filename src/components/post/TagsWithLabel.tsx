import Text from '../common/atom/Text';

export default function TagsWithLabel({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-2.5">
      <Text>{label}</Text>
      <div className="flex gap-1.5">
        {Array.isArray(children) ? (
          children.map((child) => (
            <Text key={child} color="gray">
              {child}
            </Text>
          ))
        ) : (
          <Text color="gray">{children}</Text>
        )}
      </div>
    </div>
  );
}
