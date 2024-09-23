import { getDeleteReasons } from '@/api/apis';
import Header from '@components/common/Header';
import Text from '@components/common/atom/Text';
import UnderlineOptionList from '@components/common/molecules/UnderlineOptionList';
import { useQuery } from '@tanstack/react-query';

export default function DeleteAccount() {
  // const { data: reasons } = useQuery({
  //   queryKey: ['deleteReasons'],
  //   queryFn: getDeleteReasons,
  // });

  // console.log(reasons);

  const deleteReasons = [
    '사용을 잘 안하게 돼요',
    '서비스 활성화가 잘 안되어 있어요',
    '개인정보 보호를 위해 삭제할 필요가 있어요',
    '서비스 기능이 미흡해요',
    '오류가 잦아요',
  ];

  return (
    <div>
      <Header>회원 탈퇴</Header>
      <div className="p-5 pt-10 flex flex-col gap-3">
        <Text size="xl" weight="bold">
          룩엣더웨더를{' '}
          <Text size="xl" weight="bold" color="error" className="inline">
            탈퇴
          </Text>
          하시는
          <br /> 이유가 있을까요?
        </Text>
        <Text color="gray">
          탈퇴하시는 이유를 알려주시면, 더 나은 서비스를
          <br /> 만들기 위해 노력하겠습니다.
        </Text>
      </div>
      <UnderlineOptionList optionList={deleteReasons} handleOptionClick={() => {}} />
    </div>
  );
}
