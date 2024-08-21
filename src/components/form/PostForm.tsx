import Text from '@components/common/atom/Text';
import Label from '@components/form/Label';
import Location from '@components/common/molecules/Location';
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
import Button from '@components/common/molecules/Button';
import MarkdownRenderer from '@components/common/organism/MarkdownRenderer';

interface PostWriteFormProps {
  type: '작성' | '수정';
  defaultValues: PostFormData;
  onSubmit: (data: PostFormData) => void;
}

export default function PostWriteForm({ type, defaultValues, onSubmit }: PostWriteFormProps) {
  const {
    register,
    control,
    getValues,
    setValue,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<PostFormData>({
    defaultValues: { ...defaultValues },
  });

  setValue('location', defaultValues.location);

  const [showAlertBox, setShowAlertBox] = useState(false);
  const navigate = useNavigate();

  const handleFormCloseBtn = () => {
    const currentValues = getValues();
    const hasChanges = JSON.stringify(defaultValues) !== JSON.stringify(currentValues);

    if (hasChanges) setShowAlertBox(true);
    else navigate(-1);
  };

  return (
    <>
      <Header isModal={true} onClose={handleFormCloseBtn}>
        게시글 {type}하기
      </Header>
      {showAlertBox && (
        <AlertBox
          mainMessage={`${type}하지 않고 나가시겠어요?`}
          subMessage={`지금까지 ${type}한 내용은 삭제됩니다.`}
          onCancel={() => setShowAlertBox(false)}
          onContinue={() => navigate(-1)}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-5 pb-10 flex flex-col gap-5">
          <FileWithLabel
            name="imageId"
            label="오늘의 룩을 올려주세요"
            description="사진 추가는 최대 3장까지 가능합니다."
            rules={{ required: true }}
            setValue={setValue}
            register={register}
          />
          <div className="flex flex-col gap-4">
            <Text size="l" weight="bold">
              내용을 작성해주세요
            </Text>
            <TextAreaWithLabel
              name="title"
              label="제목"
              placeholder="제목을 입력해 주세요."
              rules={{ required: true }}
              maxLength={30}
              register={register}
              className="h-[86px]"
            />
            <TextAreaWithLabel
              name="content"
              label="내용"
              placeholder="내용을 입력해 주세요."
              maxLength={300}
              register={register}
              className="h-[238px]"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label size="l">위치</Label>
            <Location location={defaultValues.location} />
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
          <div className="flex flex-col gap-2 mb-10">
            <Text size="s" color="darkGray" weight="bold">
              게시글 작성 가이드
            </Text>
            <MarkdownRenderer markdownTitle="post-guide" size="xs" color="darkGray" />
          </div>
          <Button type="main" disabled={!isValid || isSubmitting}>
            {type === '작성' ? '업로드하기' : '수정하기'}
          </Button>
        </div>
      </form>
    </>
  );
}
