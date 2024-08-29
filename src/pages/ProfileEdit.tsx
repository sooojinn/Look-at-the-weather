import Header from '@/components/common/Header';
import DefaultDisabledInput from '@components/form/DefaultDisabledInpust';
import { useForm } from 'react-hook-form';
import Text from '@components/common/atom/Text';
import Label from '@components/form/Label';
import InputWithLabel from '@components/form/InputWithLabel';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASEURL } from '@/config/constants';
import useDebounce from '@/hooks/useDebounce';
import InputStatusMessage from '@components/form/InputStatusMessage';

export default function ProfileEdit() {
  const [userInfo, setUserInfo] = useState({
    email: 'example@example.com', // 여기에서 필드의 초기값을 설정
    nickname: 'defaultUser',
    name: '구장우',
  });
  const [doubleCheckBtnDisable, setDoubleCheckBtnDisable] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [isVisibleNicknameErrMsg, setIsVisibleNicknameErrMsg] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    getValues,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nickname: 'defaultUser',
    },
  });

  const debounceOnChangeNickName = useDebounce(watch('nickname'), 500);

  const isNicknameEmptyOrMatch = watch('nickname') === '' || watch('nickname') === userInfo.nickname;
  const isDoubleCheckDisabled = doubleCheckBtnDisable || isNicknameEmptyOrMatch;

  const onClickNicknameDoubleCheck = async () => {
    const response = await axios.get(`${BASEURL}/users/nickname-check/${getValues('nickname')}`);

    if (response.status === 200) {
      setIsNicknameChecked(true);
    }

    setDoubleCheckBtnDisable(true);
    // alert 추가해야됨
  };

  const onSubmit = (data) => {
    console.log('asd');
    console.log('Form submitted with data:', data);
    if (!isDoubleCheckDisabled || !getValues('nickname')) setIsVisibleNicknameErrMsg(true);

    if (!isNicknameChecked) {
      setError('nickname', { message: '닉네임 중복 확인을 해주세요.' });
      return;
    }
    trigger();
  };

  useEffect(() => {
    setDoubleCheckBtnDisable(false);
    setIsNicknameChecked(false);
  }, [debounceOnChangeNickName]);

  return (
    <div className="flex flex-col justify-between h-screen">
      <Header>개인정보 수정</Header>
      <form className="flex flex-col px-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 mt-5 mb-[147px]">
          <div>
            <div className="mb-2.5">
              <Label required>이메일</Label>
            </div>
            <DefaultDisabledInput defaultValue="example@example.com" />
          </div>
          <div>
            <InputWithLabel
              label="비밀번호"
              name="password"
              register={register}
              rules={{
                required: '비밀번호를 입력해 주세요.',
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*[\d\W])[A-Za-z\d\W]{8,15}$/,
                  message: '8~15자의 영문,숫자,특수문자 2가지 이상 조합으로 입력해 주세요.',
                },
              }}
              placeholder="영문/숫자/특수문자 2가지 이상 조합 (8~10자)"
              errors={errors}
              type="password"
              setValue={setValue}
            ></InputWithLabel>
          </div>
          <div>
            <InputWithLabel
              label="비밀번호 확인"
              name="confirmPassword"
              register={register}
              rules={{
                required: '비밀번호를 다시 입력해 주세요.',
                validate: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다',
              }}
              placeholder="비밀번호를 한번 더 입력해 주세요."
              errors={errors}
              type="password"
              setValue={setValue}
            ></InputWithLabel>
          </div>
          <div>
            <div className="mb-2.5">
              <Label required>이름</Label>
            </div>
            <DefaultDisabledInput defaultValue="구장우" />
          </div>
          <div>
            <div className="flex row items-end gap-2.5">
              <div className="w-full">
                <InputWithLabel
                  label="닉네임"
                  name="nickname"
                  register={register}
                  rules={{ required: '닉네임을 입력해 주세요.' }}
                  placeholder="한/영 10자 이내,특수문자,공백 불가"
                  errors={errors}
                  setValue={setValue}
                  isDisabled={false}
                  button={
                    <button
                      type="button"
                      className="w-[91px] bg-primary-main rounded-lg px-4 py-3 disabled:bg-interactive-disabled disabled:text-black"
                      onClick={onClickNicknameDoubleCheck}
                      disabled={isDoubleCheckDisabled}
                    >
                      <Text color={isDoubleCheckDisabled ? 'disabled' : 'white'} weight="bold" size="l">
                        중복확인
                      </Text>
                    </button>
                  }
                />
                {isVisibleNicknameErrMsg ? (
                  <InputStatusMessage status="error" isVisible={!isDoubleCheckDisabled}>
                    중복확인 후 프로필 수정이 가능합니다.
                  </InputStatusMessage>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="flex row mt-auto mb-10">
          <button type="submit" className="w-full bg-primary-main rounded-lg py-3 px-4">
            <Text color="white" size="l" weight="bold">
              수정하기
            </Text>
          </button>
        </div>
      </form>
    </div>
  );
}
