import DeleteReasonSelector from '@/components/common/organism/DeleteReasonSelector';
import ProtectedRoute from '@/router/ProtectedRoute';
import Header from '@components/common/Header';
import Text from '@components/common/atom/Text';

export default function DeleteAccount() {
  return (
    <ProtectedRoute>
      <Header>회원 탈퇴</Header>
      <div className="p-5 pt-10 flex flex-col gap-3">
        <Text size="xl" weight="bold">
          룩엣더웨더를 <strong className="text-status-error">탈퇴</strong>하시는
          <br /> 이유가 있을까요?
        </Text>
        <Text color="gray">
          탈퇴하시는 이유를 알려주시면, 더 나은 서비스를
          <br /> 만들기 위해 노력하겠습니다.
        </Text>
      </div>
      <DeleteReasonSelector />
    </ProtectedRoute>
  );
}
