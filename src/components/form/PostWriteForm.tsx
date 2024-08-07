import Text from '@components/common/atom/Text';
import Label from '@components/form/Label';
import Location from '@components/location/Location';
import { useForm } from 'react-hook-form';
import SelectWithLabel from '@components/form/SelectWithLabel';
import TextAreaWithLabel from '@components/form/TextAreaWithLabel';
import { PostFormData } from '@/config/types';
import FileWithLabel from './FileWithLabel';

export default function PostWriteForm() {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<PostFormData>({
    defaultValues: {
      weatherTagIds: [],
      temperatureTagIds: [],
      seasonTagId: null,
    },
  });

  const weatherOptions = [
    { key: 1, name: '흐림' },
    { key: 2, name: '맑음' },
    { key: 3, name: '눈' },
    { key: 4, name: '비' },
    { key: 5, name: '바람' },
  ];

  const temperatureOptions = [
    { key: 6, name: '더워요' },
    { key: 7, name: '추워요' },
    { key: 8, name: '따뜻해요' },
    { key: 9, name: '쌀쌀해요' },
    { key: 10, name: '적당해요' },
  ];

  const seasonOptions = [
    { key: 11, name: '봄' },
    { key: 12, name: '여름' },
    { key: 13, name: '가을' },
    { key: 14, name: '겨울' },
  ];

  const onSubmit = (data: PostFormData) => {
    console.log(data);
  };

  return (
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
          options={weatherOptions}
          rules={{ required: true }}
          control={control}
          maxSelection={2}
        />
        <SelectWithLabel
          label="온도"
          description="최대 2개까지 선택 가능합니다."
          name="temperatureTagIds"
          options={temperatureOptions}
          rules={{ required: true }}
          control={control}
          maxSelection={2}
        />
        <SelectWithLabel
          label="계절"
          name="seasonTagId"
          options={seasonOptions}
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
  );
}
