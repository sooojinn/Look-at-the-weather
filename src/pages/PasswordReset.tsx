import Header from '@/components/common/Header';
import { BASEURL } from '@/config/constants';
import Button from '@components/common/molecules/Button';
import InfoModal from '@components/common/organism/InfoModal';
import InputWithLabel from '@components/form/InputWithLabel';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function PasswordReset() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const [showModal, setShowModal] = useState(false);

  const onSubmit = async (data: any) => {
    const { password } = data;
    try {
      const response = await axios.patch(
        `${BASEURL}/api/v1/users/password`,
        { password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.data.success) {
        console.log('비밀번호가 성공적으로 변경되었습니다.');
        setShowModal(true);
      }
    } catch (error) {
      console.error(error);
    }
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
          />
        </div>
        <Button>비밀번호 재설정하기</Button>
      </form>
      {showModal && <InfoModal message="비밀번호 변경이 완료되었습니다." onClose={() => setShowModal(false)} />}
    </div>
  );
}
