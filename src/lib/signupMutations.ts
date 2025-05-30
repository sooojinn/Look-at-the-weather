import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorResponse, RegisterForm, VerifyCodeProps } from '@/config/types';
import useSignupStore from '@/store/signupStore';
import { showToast } from '@/components/provider/ToastProvider';
import { FieldValues, Path, UseFormClearErrors, UseFormSetError } from 'react-hook-form';
import { checkNickname, registerUser, sendVerificationCode, verifyCode } from '@/api/apis';
import { useRouter } from 'next/navigation';

// 이메일 인증번호 전송
export const useSendVerificationMutation = <T extends FieldValues>(
  setError: UseFormSetError<T>,
): UseMutationResult<void, AxiosError<ErrorResponse>, string> => {
  const setIsCodeSended = useSignupStore((state) => state.setIsCodeSended);

  return useMutation({
    mutationFn: sendVerificationCode,
    onSuccess: () => {
      setIsCodeSended(true);
    },
    onError: (error) => {
      if (error.response?.data.errorCode === 'EMAIL_ALREADY_EXIST') {
        setError('email' as Path<T>, { message: '이미 가입된 이메일입니다.' });
      } else if (error.response?.data.errorCode === 'UNABLE_TO_SEND_EMAIL') {
        setError('email' as Path<T>, { message: '인증번호 전송 실패. 다시 시도해주세요.' });
      } else {
        console.error('이메일 인증번호 전송 오류:', error);
      }
    },
  });
};

// 이메일 인증코드 확인
export const useVerifyCodeMutation = <T extends FieldValues>(
  setError: UseFormSetError<T>,
  clearErrors: UseFormClearErrors<T>,
): UseMutationResult<void, AxiosError<ErrorResponse>, VerifyCodeProps> => {
  const setIsEmailVerified = useSignupStore((state) => state.setIsEmailVerified);

  return useMutation({
    mutationFn: verifyCode,
    onSuccess: () => {
      setIsEmailVerified(true);
      clearErrors('code' as Path<T>);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response?.data.errorCode === 'FAIL_EMAIL_VERIFICATION') {
        setError('code' as Path<T>, { message: '인증번호가 올바르지 않습니다.' });
      } else {
        console.error('이메일 인증 코드 확인 오류:', error);
      }
    },
  });
};

// 닉네임 중복확인
export const useCheckNicknameMutation = <T extends FieldValues>(
  setError: UseFormSetError<T>,
  clearErrors: UseFormClearErrors<T>,
): UseMutationResult<void, AxiosError<ErrorResponse>, string> => {
  const setIsNicknameChecked = useSignupStore((state) => state.setIsNicknameChecked);

  return useMutation({
    mutationFn: checkNickname,
    onSuccess: () => {
      setIsNicknameChecked(true);
      clearErrors('nickname' as Path<T>);
    },
    onError: (error) => {
      if (error.response?.data.errorCode === 'NICKNAME_ALREADY_EXIST') {
        setError('nickname' as Path<T>, { message: '이미 사용 중인 닉네임입니다.' });
      } else {
        console.error('닉네임 중복 검사 오류:', error);
      }
    },
  });
};

// 회원가입
export const useRegisterMutation = (): UseMutationResult<void, AxiosError<ErrorResponse>, RegisterForm> => {
  const { resetSignupState } = useSignupStore();
  const router = useRouter();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      router.push('/login');
      showToast('회원가입에 성공했습니다.');
      resetSignupState();
    },
    onError: (error) => {
      console.error('회원가입 오류:', error);
      showToast('회원가입에 실패했습니다.');
      resetSignupState();
    },
  });
};
