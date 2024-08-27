import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { sendVerificationCode, verifyCode, checkNickname, registerUser } from '@/lib/signupApi';
import { ErrorResponse, RegisterForm, VerifyCodeProps } from '@/config/types';
import useSignupStore from '@/store/signupStore';
import { showToast } from '@components/common/molecules/ToastProvider';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// 이메일 인증번호 전송
export const useSendVerificationMutation = (): UseMutationResult<void, AxiosError<ErrorResponse>, string> => {
  const { setIsCodeSended } = useSignupStore();

  return useMutation<void, AxiosError<ErrorResponse>, string>({
    mutationFn: sendVerificationCode,
    onSuccess: () => {
      setIsCodeSended(true);
    },
    onError: (error) => {
      if (error.response?.data.errorCode === 'EMAIL_ALREADY_EXIST') {
        throw new Error('이미 가입된 이메일입니다.');
      } else if (error.response?.data.errorCode === 'UNABLE_TO_SEND_EMAIL') {
        throw new Error('인증번호 전송 실패. 다시 시도해주세요.');
      } else {
        console.error('이메일 인증번호 전송 오류:', error);
      }
    },
  });
};

// 이메일 인증코드 확인
export const useVerifyCodeMutation = (): UseMutationResult<void, AxiosError<ErrorResponse>, VerifyCodeProps> => {
  const { setIsEmailVerified } = useSignupStore();
  const { clearErrors } = useForm();

  return useMutation<void, AxiosError<ErrorResponse>, VerifyCodeProps>({
    mutationFn: verifyCode,
    onSuccess: () => {
      setIsEmailVerified(true);
      clearErrors('code');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response?.data.errorCode === 'FAIL_EMAIL_VERIFICATION') {
        throw new Error('인증번호가 올바르지 않습니다.');
      } else {
        console.error('이메일 인증 코드 확인 오류:', error);
      }
    },
  });
};

// 닉네임 중복확인
export const useCheckNicknameMutation = (): UseMutationResult<void, AxiosError<ErrorResponse>, string> => {
  const { setIsNicknameChecked } = useSignupStore();

  return useMutation<void, AxiosError<ErrorResponse>, string>({
    mutationFn: checkNickname,
    onSuccess: () => {
      setIsNicknameChecked(true);
    },
    onError: (error) => {
      if (error.response?.data.errorCode === 'NICKNAME_ALREADY_EXIST') {
        throw new Error('이미 사용 중인 닉네임입니다.');
      } else {
        console.error('닉네임 중복 검사 오류:', error);
      }
    },
  });
};

// 회원가입
export const useRegisterMutation = (): UseMutationResult<void, AxiosError<ErrorResponse>, RegisterForm> => {
  const { resetSignupState } = useSignupStore();
  const navigate = useNavigate();

  return useMutation<void, AxiosError<ErrorResponse>, RegisterForm>({
    mutationFn: registerUser,
    onSuccess: () => {
      navigate('/');
      showToast('회원가입에 성공했습니다.');
      resetSignupState();
    },
    onError: (error) => {
      console.error('회원가입 오류:', error);
      showToast('회원가입에 실패했습니다.');
    },
  });
};
