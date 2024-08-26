import { useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/common/Header';
import { BASEURL } from '@/config/constants';
import InputWithLabel from '@components/form/InputWithLabel';
import Button from '@components/common/molecules/Button';
import InfoModal from '@components/common/organism/InfoModal';
import { useMutation } from '@tanstack/react-query';
import { ErrorResponse } from '@/config/types';

interface findEmailForm {
  name: string;
  nickname: string;
}

const findEmail = async (data: findEmailForm) => {
  const response = await axios.post(`${BASEURL}/api/v1/users/email`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export default function FindEmail() {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<findEmailForm>();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const findEmailMutation = useMutation({
    mutationFn: findEmail,
    onSuccess: (data) => {
      const { email } = data;
      navigate('/findemail/result', {
        state: {
          name: getValues('name'),
          email: email,
        },
      });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response?.data.errorCode === 'NOT_MATCH_EMAIL') {
        setShowModal(true);
      } else {
        console.error('이메일 찾기 오류:', error);
      }
    },
  });

  const onSubmit = async (data: findEmailForm) => {
    findEmailMutation.mutate(data);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header>이메일 찾기</Header>
      <form className="flex flex-col justify-between h-screen p-5 pb-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <InputWithLabel
            name="name"
            label="이름"
            placeholder="이름을 입력해 주세요."
            register={register}
            rules={{ required: '이름을 입력해 주세요.' }}
            errors={errors}
            setValue={setValue}
          />
          <InputWithLabel
            name="nickname"
            label="닉네임"
            placeholder="닉네임을 입력해 주세요."
            register={register}
            rules={{ required: '닉네임을 입력해 주세요.' }}
            errors={errors}
            setValue={setValue}
          />
        </div>
        <Button>이메일 찾기</Button>
      </form>
      {showModal && <InfoModal message="가입된 계정 정보가 없습니다." onClose={() => setShowModal(false)} />}
    </div>
  );
}
