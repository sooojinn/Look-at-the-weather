import Text from '@components/common/atom/Text';

interface TagsProps {
  tags: string[];
}

export default function Tags({ tags }: TagsProps) {
  return (
    <div className="flex flex-wrap gap-x-2 mt-1">
      {tags.map((tag) => (
        <Text size="s" color="gray">
          #{tag}
        </Text>
      ))}
    </div>
  );
}
