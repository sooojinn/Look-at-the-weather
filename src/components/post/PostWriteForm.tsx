import Text from '@components/common/atom/Text';
import Label from '@components/form/Label';
import Location from '@components/location/Location';
import { useForm } from 'react-hook-form';
import SelectWithLabel from '@components/form/SelectWithLabel';
import TextAreaWithLabel from '@components/form/TextAreaWithLabel';

export interface Location {
  city: string;
  district: string;
}

export interface PostFormData {
  title: string;
  content: string;
  location: Location;
  weatherTag: string[];
  temperatureTag: string[];
  seasonTag: string;
}

export default function PostWriteForm() {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<PostFormData>({
    defaultValues: {
      weatherTag: [],
      temperatureTag: [],
      seasonTag: '',
    },
  });

  const weatherOptions = ['흐림', '맑음', '눈', '비', '바람'];
  const temperatureOptions = ['더워요', '추워요', '따뜻해요', '쌀쌀해요', '적당해요'];
  const seasonOptions = ['봄', '여름', '가을', '겨울'];

  const onSubmit = (data: PostFormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-5 pb-10 flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <Text weight="bold">내용을 작성해주세요</Text>
          <TextAreaWithLabel
            id="title"
            label="제목"
            placeholder="제목을 입력해 주세요."
            register={register}
            required
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
          <Label>위치</Label>
          <Location
            size="s"
            onLocationChange={(location) => {
              setValue('location', location); // 폼 데이터에 위치 설정
            }}
          />
        </div>
        <SelectWithLabel
          label="해당 코디를 입었을 때 날씨를 알려주세요"
          description="최대 2개까지 선택 가능합니다."
          name="weatherTag"
          options={weatherOptions}
          rules={{ required: '날씨를 선택해주세요.' }}
          control={control}
          maxSelection={2}
        />
        <SelectWithLabel
          label="온도"
          description="최대 2개까지 선택 가능합니다."
          name="temperatureTag"
          options={temperatureOptions}
          rules={{ required: '온도를 선택해주세요.' }}
          control={control}
          maxSelection={2}
        />
        <SelectWithLabel
          label="계절"
          description="최대 1개까지 선택 가능합니다."
          name="seasonTag"
          options={seasonOptions}
          control={control}
        />
      </div>
      <div className="bg-background-light p-5 pb-10">
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={`w-full h-14 rounded-[10px] ${
            isValid && !isSubmitting ? 'bg-primary-lightest text-white' : 'bg-disabled text-lightGray'
          }`}
        >
          <Text size="l" weight="bold">
            업로드하기
          </Text>
        </button>
      </div>
    </form>
  );
}
