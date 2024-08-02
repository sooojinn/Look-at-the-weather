interface TagsProps {
  tags: string[];
}

export default function Tags({ tags }: TagsProps) {
  return tags.map((tag, index) => (
    <span key={index} className="inline-block h-auto mr-2 text-[13px] text-gray">
      #{tag}
    </span>
  ));
}
