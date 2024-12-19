import Text from '@components/common/atom/Text';

interface TagsProps {
  tags: (string | null)[];
}

export default function Tags({ tags }: TagsProps) {
  return (
    <div className="min-h-[39px] flex flex-wrap gap-x-2 mt-1">
      {tags.map(
        (tag, index) =>
          tag && (
            <Text key={index} size="s" color="gray">
              #{tag}
            </Text>
          ),
      )}
    </div>
  );
}
