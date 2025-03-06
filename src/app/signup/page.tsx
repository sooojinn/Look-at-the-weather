'use client';

import { useForm } from 'react-hook-form';
import Header from '@/components/common/organism/Header';
import Button from '@/components/common/atom/Button';
import LocationTermsCheckBox from '@/components/form/organism/inputs/LocationTermsCheckBox';
import { useRegisterMutation } from '@/lib/signupMutations';
import { SignupForm } from '@/config/types';
import EmailInput from '@components/form/organism/inputs/EmailInput';
import CodeInput from '@components/form/organism/inputs/CodeInput';
import PasswordInput from '@components/form/organism/inputs/PasswordInput';
import PasswordCheckInput from '@components/form/organism/inputs/PasswordCheckInput';
import NameInput from '@components/form/organism/inputs/NameInput';
import NicknameInput from '@components/form/organism/inputs/NicknameInput';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginRestrictionRoute from '@/components/route/LoginRestrictionRoute';
import SignUpExitModal from '@/components/modal/SignUpExitModal';

export default function Signup() {
  const formMethods = useForm<SignupForm>({
    defaultValues: {
      email: '',
      code: '',
      password: '',
      confirmPassword: '',
      name: '',
      nickname: '',
      terms: false,
    },
  });

  const {
    register,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors, isDirty },
  } = formMethods;

  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const { mutate: registerMutation } = useRegisterMutation();

  const handleFormCloseBtn = () => {
    if (isDirty) setShowModal(true);
    else router.back();
  };

  const onSubmit = async (data: SignupForm) => {
    const { email, password, name, nickname } = data;
    registerMutation({ email, password, name, nickname, isSocial: false });
  };

  return (
    <LoginRestrictionRoute>
      <Header hideBackBtn onClose={handleFormCloseBtn}>
        회원가입
      </Header>
      <form className="flex flex-col flex-grow gap-4 pt-5 px-5 overflow-auto scrollbar-hide">
        <EmailInput<SignupForm> shouldValidate {...formMethods} />
        <CodeInput<SignupForm> {...formMethods} />
        <PasswordInput<SignupForm> shouldValidate {...formMethods} />
        <PasswordCheckInput<SignupForm> {...formMethods} />
        <NameInput<SignupForm> shouldValidate {...formMethods} />
        <NicknameInput<SignupForm> shouldValidate {...formMethods} />
        <LocationTermsCheckBox register={register} errors={errors} isChecked={watch('terms')} />
      </form>
      <div className="px-5 pb-10">
        <Button type="main" isSubmitting={isSubmitting} onClick={handleSubmit(onSubmit)}>
          가입하기
        </Button>
      </div>
      {showModal && <SignUpExitModal onContinue={() => setShowModal(false)} onCancel={() => router.back()} />}
    </LoginRestrictionRoute>
  );
}
