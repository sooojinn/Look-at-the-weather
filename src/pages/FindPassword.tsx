import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/common/Header';
import { BASEURL } from '@/config/constants';
import InputWithLabel from '@components/form/InputWithLabel';
import ErrorMessage from '@components/form/ErrorMessage';
import Button from '@components/common/molecules/Button';
import InfoModal from '@components/common/organism/InfoModal';

export default function FindPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(`${BASEURL}/api/v1/users/password`, data);
      if (response.status === 200) {
        navigate('/passwordreset'); // 비밀번호 재설정 페이지로 이동
      }
    } catch (error) {
      setShowModal(true);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header>비밀번호 찾기</Header>
      <form className="flex flex-col justify-between h-screen p-5 pb-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <div>
            <InputWithLabel
              name="email"
              label="이메일"
              placeholder="이메일을 입력해 주세요."
              register={register}
              rules={{ required: '이메일을 입력해주세요' }}
              errors={errors}
            />
            <ErrorMessage errors={errors} name="email" />
          </div>
          <div>
            <InputWithLabel
              name="name"
              label="이름"
              placeholder="이름을 입력해 주세요."
              register={register}
              rules={{ required: '이름을 입력해주세요' }}
              errors={errors}
            />
            <ErrorMessage errors={errors} name="name" />
          </div>
          <div>
            <InputWithLabel
              name="nickname"
              label="닉네임"
              placeholder="닉네임을 입력해 주세요."
              register={register}
              rules={{ required: '닉네임을 입력해주세요' }}
              errors={errors}
            />
            <ErrorMessage errors={errors} name="nickname" />
          </div>
        </div>
        <Button>비밀번호 찾기</Button>
      </form>
      {showModal && <InfoModal message="가입된 계정 정보가 없습니다." onClose={() => setShowModal(false)} />}
    </div>
  );
}
