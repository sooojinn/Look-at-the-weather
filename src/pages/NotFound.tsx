import NotFoundIcon from '@components/icons/NotFound';
import Text from '@components/common/atom/Text';
import FooterNavi from '@components/common/FooterNavi';
import Button from '@components/common/molecules/Button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <NotFoundIcon className="mb-[20px]" />
      <Text weight="bold" color="lightBlack" size="xl" className="mb-[6px]">
        Not Found
      </Text>
      <Text color="gray" className="leading-normal text-center mb-[40px]">
        존재하지 않는 주소를 입력하셨거나,
        <br />
        요청하신 페이지의 주소가 변경,
        <br />
        삭제되어 찾을 수 없습니다.
      </Text>
      <Button
        size="l"
        width={164}
        type="sub"
        onClick={() => {
          window.location.href = '/';
        }}
      >
        홈으로
      </Button>
      <FooterNavi />
    </div>
  );
}
