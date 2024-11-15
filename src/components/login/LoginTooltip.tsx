import Text from '@components/common/atom/Text';

export default function LoginTooltip() {
  return (
    <div className="animate-bounceTooltip z-30">
      <div className="bg-white rounded-[10px] px-3 py-2.5 drop-shadow-custom">
        <Text size="xs" color="gray" className="text-center whitespace-nowrap">
          지금 로그인하고
          <br />더 <strong className="font-bold text-primary-main">자유롭게 룩엣더웨더를 즐겨</strong>보세요!
        </Text>
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white"></div>
    </div>
  );
}
