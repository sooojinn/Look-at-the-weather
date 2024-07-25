import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import { BASEURL } from '../constants/constants';

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

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header>비밀번호 찾기</Header>
      <form className="flex flex-col justify-between h-screen px-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block mb-2 my-4 text-gray-600 font-bold">
            이메일<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="(예시) abcde@naver.com"
            {...register('email', { required: '이메일을 입력해주세요' })}
          />
          {errors.email && <p className="text-red-500">{errors.email.message?.toString()}</p>}
        </div>
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
            비밀번호 찾기
          </button>
        </div>
      </form>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="mb-4 text-gray-600 font-bold">가입된 계정 정보가 없습니다.</p>
            <button
              type="button"
              className="font-bold bg-interactive-light hover:bg-primary-lightest hover:text-white rounded-lg py-3 px-4"
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
