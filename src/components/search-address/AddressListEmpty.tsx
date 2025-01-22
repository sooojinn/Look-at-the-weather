import Text from '../common/atom/Text';

export default function AddressListEmpty() {
  return (
    <div className="mt-3 px-4">
      <Text size="s" color="darkGray" weight="bold" className="mb-2">
        이렇게 검색해 보세요
      </Text>
      <Text size="xs" color="darkGray">
        • 도로명 + 건물번호 (화곡로 398)
        <br />• 지역명(동/리)+ 번지 (등촌동 639-11)
      </Text>
    </div>
  );
}
