import Header from '@/components/common/Header';
import { BASEURL } from '@/config/constants';
import Button from '@components/common/molecules/Button';
import { showToast } from '@components/common/molecules/ToastProvider';
import InfoModal from '@components/common/organism/InfoModal';
import InputWithLabel from '@components/form/InputWithLabel';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

interface passwordResetForm {
  userId: number;
  password: string;
  confirmPassword: string;
}

const passwordReset = async (data: passwordResetForm) => {
  const { userId, password } = data;

  const response = await axios.patch(
    `${BASEURL}/api/v1/users/password`,
    { userId, password },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return response.data;
};

export default function PasswordReset() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<passwordResetForm>({ mode: 'onChange' });

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = location.state;

  setValue('userId', userId);

  const passwordResetMutation = useMutation({
    mutationFn: passwordReset,
    onSuccess: () => setShowModal(true),
    onError: (error) => {
      console.error('비밀번호 재설정 실패: ', error);
      showToast('비밀번호 재설정에 실패했습니다.');
      reset();
    },
  });

  const onSubmit = async (data: passwordResetForm) => {
    passwordResetMutation.mutate(data);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header>비밀번호 재설정</Header>
      <form className="flex flex-col justify-between h-screen p-5 pb-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <InputWithLabel
            name="password"
            label="새 비밀번호"
            type="password"
            placeholder="영문/숫자/특수문자 2가지 이상 조합 (8~15자)"
            register={register}
            rules={{
              required: '비밀번호를 입력해 주세요.',
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*[\d\W])[A-Za-z\d\W]{8,15}$/,
                message: '8~15자의 영문,숫자,특수문자 2가지 이상 조합으로 입력해 주세요.',
              },
            }}
            errors={errors}
            setValue={setValue}
          />
          <InputWithLabel
            name="confirmPassword"
            type="password"
            label="비밀번호 확인"
            placeholder="비밀번호를 한번 더 입력해 주세요."
            register={register}
            rules={{
              required: '비밀번호를 다시 입력해 주세요.',
              validate: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다',
            }}
            errors={errors}
            setValue={setValue}
          />
        </div>
        <Button>비밀번호 재설정하기</Button>
      </form>
      {showModal && (
        <InfoModal
          message="비밀번호 변경이 완료되었습니다."
          onClose={() => {
            setShowModal(false);
            navigate('/');
          }}
        />
      )}
    </div>
  );
}
