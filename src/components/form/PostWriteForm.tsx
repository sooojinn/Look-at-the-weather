import Text from '@components/common/atom/Text';
import Label from '@components/form/Label';
import Location from '@components/location/Location';
import { useForm } from 'react-hook-form';
import SelectWithLabel from '@components/form/SelectWithLabel';
import TextAreaWithLabel from '@components/form/TextAreaWithLabel';
import { PostFormData } from '@/config/types';
import FileWithLabel from './FileWithLabel';
import { useState } from 'react';
import AlertBox from '@components/common/organism/AlertBox';
import Header from '@components/common/Header';
import { useNavigate } from 'react-router-dom';
import { SEASON_TAGS, TEMPERATURE_TAGS, WEATHER_TAGS } from '@/config/constants';

export default function PostWriteForm({ header, defaultValues }: { header: string; defaultValues: PostFormData }) {
  const {
    register,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<PostFormData>({
    defaultValues: { ...defaultValues },
  });

  const [showAlertBox, setShowAlertBox] = useState(false);
  const navigate = useNavigate();

  const handleFormCloseBtn = () => {
    const currentValues = getValues();
    const hasChanges = JSON.stringify(defaultValues) !== JSON.stringify(currentValues);

    if (hasChanges) setShowAlertBox(true);
    else navigate(-1);
  };

  const handleAlertBoxCloseBtn = () => {
    setShowAlertBox(false);
  };

  const onSubmit = (data: PostFormData) => {
    console.log(data);
  };

  return (
    <>
      <Header isModal={true} onClose={handleFormCloseBtn}>
        {header}
      </Header>
      {showAlertBox && (
        <AlertBox
          mainMessage="작성하지 않고 나가시겠어요?"
          subMessage="지금까지 쓴 내용은 삭제됩니다."
          onClose={handleAlertBoxCloseBtn}
          onContinue={() => navigate(-1)}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-5 pb-10 flex flex-col gap-5">
          <FileWithLabel label="오늘의 룩을 올려주세요" description="사진 추가는 최대 3장까지 가능합니다." />
          <div className="flex flex-col gap-4">
            <Text size="l" weight="bold">
              내용을 작성해주세요
            </Text>
            <TextAreaWithLabel
              id="title"
              label="제목"
              placeholder="제목을 입력해 주세요."
              rules={{ required: true }}
              register={register}
              className="h-[86px]"
            />
            <TextAreaWithLabel
              id="content"
              label="내용"
              placeholder="내용을 입력해 주세요."
              register={register}
              className="h-[238px]"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label size="l">위치</Label>
            <Location
              onLocationChange={(location) => {
                setValue('location', location); // 폼 데이터에 위치 설정
              }}
            />
          </div>
          <SelectWithLabel
            label="해당 코디를 입었을 때 날씨를 알려주세요"
            description="최대 2개까지 선택 가능합니다."
            name="weatherTagIds"
            options={WEATHER_TAGS}
            rules={{ required: true }}
            control={control}
            maxSelection={2}
          />
          <SelectWithLabel
            label="온도"
            description="최대 2개까지 선택 가능합니다."
            name="temperatureTagIds"
            options={TEMPERATURE_TAGS}
            rules={{ required: true }}
            control={control}
            maxSelection={2}
          />
          <SelectWithLabel
            label="계절"
            name="seasonTagId"
            options={SEASON_TAGS}
            rules={{ required: true }}
            control={control}
          />
        </div>
        <div className="bg-background-light p-5 pb-10">
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`w-full h-14 rounded-[10px] ${isValid && !isSubmitting ? 'bg-primary-main' : 'bg-disabled '}`}
          >
            <Text size="l" color={isValid && !isSubmitting ? 'white' : 'lightGray'} weight="bold">
              업로드하기
            </Text>
          </button>
        </div>
      </form>
    </>
  );
}
