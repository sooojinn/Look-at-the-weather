import axios from 'axios';
import { BASEURL } from '@/config/constants';
import { RegisterForm, VerifyCodeProps } from '@/config/types';

// 이메일 인증번호 전송
export const sendVerificationCode = async (email: string) => {
  await axios.post(
    `${BASEURL}/api/v1/email/send-verification`,
    { email },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

// 이메일 인증코드 확인
export const verifyCode = async ({ email, code }: VerifyCodeProps) => {
  await axios.post(
    `${BASEURL}/api/v1/email/verify-code`,
    { email, code },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

// 닉네임 중복확인
export const checkNickname = async (nickname: string) => {
  await axios.get(`${BASEURL}/api/v1/users/nickname-check/${nickname}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// 회원가입
export const registerUser = async (data: RegisterForm) => {
  await axios.post(`${BASEURL}/api/v1/users/register`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
