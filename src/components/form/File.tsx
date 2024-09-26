import { FileProps, ImageItem, PostFormData } from '@/config/types';
import Text from '@components/common/atom/Text';
import ImgDeleteIcon from '@components/icons/ImgDeleteIcon';
import PlusIcon from '@components/icons/PlusIcon';
import { useMutation } from '@tanstack/react-query';
import React, { useRef } from 'react';
import { showToast } from '@components/common/molecules/ToastProvider';
import { deleteImage } from '@/api/apis';
import axios from 'axios';
import { BASEURL } from '@/constants/constants';
import { useFormContext } from 'react-hook-form';

interface PreviewImageProps extends ImageItem {
  onDelete: (id: number) => void;
}

interface AddImageBtnProps {
  handleAddClick: () => void;
}

// 이미지 업로드 함수
const uploadImage = async (file: File): Promise<{ id: number }> => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post(`${BASEURL}/s3/post-image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `${localStorage.getItem('accessToken')}`,
    },
  });
  return response.data;
};

export default function File({ name, rules }: FileProps) {
  const { register, getValues, setValue } = useFormContext<PostFormData>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_IMAGES = 3;

  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data, file) => {
      const existingFiles = getValues('images') || [];
      const existingImageIds = existingFiles.map((file) => file.imageId);
      const newFile = { imageId: data.id, url: URL.createObjectURL(file), fileName: file.name };
      setValue('images', [...existingFiles, newFile]);
      setValue(name, [...existingImageIds, newFile.imageId], { shouldDirty: true });
    },
    onError: () => {
      showToast('이미지 업로드 실패. 다시 시도해주세요.');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteImage,
    onError: (error) => {
      console.error('이미지 삭제에 실패했습니다:', error);
    },
  });

  // 이미지 업로드 시 실행되는 함수
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        // 이미 업로드된 이미지인지 확인
        const existingFiles = getValues('images') || [];
        const fileExists = existingFiles.some((img) => img.fileName === file.name);
        if (!fileExists) {
          uploadImageMutation.mutate(file);
        }
      });
    }
  };

  // 특정 이미지를 삭제하는 함수
  const handleDeleteImage = async (id: number) => {
    const updatedImages = getValues('images').filter((img) => img.imageId !== id);
    const updatedImageIds = getValues('imageIds').filter((imageId) => imageId !== id);
    setValue('images', updatedImages);
    setValue(name, updatedImageIds, { shouldDirty: true });
    deleteMutation.mutate(id);
  };

  return (
    <>
      <div className="h-[197px] flex space-x-2 overflow-auto scrollbar-hide">
        {(getValues('images') || []).map((image) => {
          const { imageId, url } = image;
          return <PreviewImage key={imageId} imageId={imageId} url={url} onDelete={handleDeleteImage} />;
        })}
        {(getValues('images') || []).length < MAX_IMAGES && (
          <AddImageBtn handleAddClick={() => fileInputRef.current?.click()} />
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        multiple
        {...register(name, rules)}
        onChange={handleImageUpload}
        ref={fileInputRef}
        className="hidden"
      />
    </>
  );
}

function PreviewImage({ imageId, url, onDelete }: PreviewImageProps) {
  return (
    <div className="w-[158px] flex-shrink-0 flex justify-center items-center bg-background-light relative">
      <img src={url} alt={`사진 ${imageId}`} className="w-full h-full object-cover" />
      <ImgDeleteIcon id={imageId} onDelete={onDelete} />
    </div>
  );
}

function AddImageBtn({ handleAddClick }: AddImageBtnProps) {
  return (
    <div
      className="w-[158px] bg-background-light flex justify-center items-center flex-shrink-0 cursor-pointer"
      onClick={handleAddClick}
    >
      <div className="flex flex-col justify-center items-center gap-[2px]">
        <PlusIcon />
        <Text color="gray">사진 추가</Text>
      </div>
    </div>
  );
}
