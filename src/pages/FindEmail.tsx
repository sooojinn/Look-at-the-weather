import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';
import { BASEURL } from '../constants/constants';

export default function FindEmail() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [email, setEmail] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(`${BASEURL}/api/v1/users/email`, data);
      setEmail(response.data.email);
    } catch (error) {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handlePasswordReset = () => {
    navigate('/findpassword');
  };

  const handleLogin = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col h-screen">
      <PageTitle title="이메일 찾기" />
      {email ? (
        <div className="flex flex-col justify-between h-screen  flex-grow px-5">
          <div className="mt-5">
            <p className="mb-4 px-20 text-gray-600 font-bold">{`${email} 님의 가입된 이메일 정보는 아래와 같습니다.`}</p>
            <p className="mb-4 py-3 bg-background-light text-gray-800 text-center font-semibold">{email}</p>
          </div>
          <div className="flex flex-col">
            <button
              type="button"
              className="w-full font-bold mb-3 bg-interactive-light hover:bg-primary-lightest hover:text-white rounded-lg py-3 px-4"
              onClick={handlePasswordReset}
            >
              비밀번호 찾기
            </button>
            <button
              type="button"
              className="w-full font-bold bg-interactive-light hover:bg-primary-lightest hover:text-white rounded-lg py-3 px-4"
              onClick={handleLogin}
            >
              로그인하기
            </button>
          </div>
        </div>
      ) : (
        <form className="flex flex-col justify-between h-screen px-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block mb-2 my-4 text-gray-600 font-bold">
              이름<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="이름을 입력해 주세요."
              {...register('name', { required: '이름을 입력해주세요' })}
            />
            {errors.name && <p className="text-red-500">{errors.name.message?.toString()}</p>}
          </div>
          <div>
            <label className="block mb-2 my-4 text-gray-600 font-bold">
              닉네임<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
                errors.nickname ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="닉네임을 입력해 주세요."
              {...register('nickname', { required: '닉네임을 입력해주세요' })}
            />
            {errors.nickname && <p className="text-red-500">{errors.nickname.message?.toString()}</p>}
          </div>
          <div className="mt-auto mb-10 mx-5">
            <button
              type="submit"
              className="font-bold w-full bg-interactive-light hover:bg-primary-lightest hover:text-white rounded-lg py-3 px-4"
            >
              이메일 찾기
            </button>
          </div>
        </form>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="mb-6 text-gray-600 font-bold">가입된 계정 정보가 없습니다.</p>
            <button
              type="button"
              className="w-full font-bold bg-interactive-light hover:bg-primary-lightest hover:text-white rounded-lg py-3 px-4"
              onClick={closeModal}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
