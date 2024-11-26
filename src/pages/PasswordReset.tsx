import Header from '@/components/common/Header';
import Button from '@components/common/molecules/Button';
import { showToast } from '@components/common/molecules/ToastProvider';
import PasswordCheckInput from '@components/form/inputs/PasswordCheckInput';
import PasswordInput from '@components/form/inputs/PasswordInput';
import { patchPasswordReset } from '@/api/apis';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import AlertModal from '@components/common/organism/AlertModal';

interface PasswordResetForm {
  userId: number;
  password: string;
  confirmPassword: string;
}

export default function PasswordReset() {
  const formMethods = useForm<PasswordResetForm>({ mode: 'onChange' });
  const { handleSubmit, setValue, reset } = formMethods;

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = location.state;

  setValue('userId', userId);

  const passwordResetMutation = useMutation({
    mutationFn: patchPasswordReset,
    onSuccess: () => setShowModal(true),
    onError: (error) => {
      console.error('비밀번호 재설정 실패: ', error);
      showToast('비밀번호 재설정에 실패했습니다.');
      reset();
    },
  });

  const onSubmit = async (data: PasswordResetForm) => {
    passwordResetMutation.mutate(data);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header>비밀번호 재설정</Header>
      <form className="flex flex-col justify-between h-screen p-5 pb-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <PasswordInput<PasswordResetForm> isPasswordReset shouldValidate {...formMethods} />
          <PasswordCheckInput<PasswordResetForm> {...formMethods} />
        </div>
        <Button>비밀번호 재설정하기</Button>
      </form>
      {showModal && (
        <AlertModal
          boldMessage="비밀번호 재설정 완료"
          regularMessage="비밀번호 변경이 완료되었습니다."
          buttons={
            <Button
              onClick={() => {
                setShowModal(false);
                navigate('/');
              }}
            >
              확인
            </Button>
          }
        />
      )}
    </div>
  );
}
