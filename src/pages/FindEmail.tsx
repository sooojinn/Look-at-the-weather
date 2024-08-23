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

export default function FindEmail() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(`${BASEURL}/api/v1/users/email`, data);
      const { email } = response.data;
      navigate('/findemail/result', {
        state: {
          name: getValues('name'),
          email: email,
        },
      });
    } catch (error) {
      setShowModal(true);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header>이메일 찾기</Header>
      <form className="flex flex-col justify-between h-screen p-5 pb-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
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
        <Button>이메일 찾기</Button>
      </form>
      {showModal && <InfoModal message="가입된 계정 정보가 없습니다." onClose={() => setShowModal(false)} />}
    </div>
  );
}
