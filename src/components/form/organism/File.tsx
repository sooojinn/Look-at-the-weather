import { FileProps, ImageItem, PostFormData } from '@/config/types';
import Text from '@components/common/atom/Text';
import ImgDeleteBtn from '@components/icons/ImgDeleteBtn';
import PlusIcon from '@components/icons/PlusIcon';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useRef } from 'react';
import { showToast } from '@/components/provider/ToastProvider';
import { deleteImage, uploadImage } from '@/api/apis';
import { useFormContext } from 'react-hook-form';
import Spinner from '@components/icons/Spinner';
import { useDeletedImagesStore } from '@/store/deletedImagesStroe';
import HorizontalScroll from '@/components/common/atom/HorizontalScroll';
import Image from 'next/image';

interface PreviewImageProps extends ImageItem {
  onDelete: (id: number) => void;
  classNames: string;
}

interface AddImageBtnProps {
  handleAddClick: () => void;
  classNames: string;
}

export default function File({ name, rules, defaultImageIds }: FileProps) {
  const { register, getValues, setValue, watch } = useFormContext<PostFormData>();
  const { deletedDefaultImageIds, setDeletedDefaultImageIds, reset } = useDeletedImagesStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_IMAGES = 3;

  const removeImageAndId = (id: number) => {
    const updatedImages = getValues('images').filter((img) => img.imageId !== id);
    const updatedImageIds = getValues('imageIds').filter((imageId) => imageId !== id);
    setValue('images', updatedImages);
    setValue(name, updatedImageIds, { shouldDirty: true, shouldValidate: true });
  };

  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data, file) => {
      const existingFiles = getValues('images') || [];
      const existingImageIds = existingFiles.map((file) => file.imageId);
      const newFile = { imageId: data.id, url: URL.createObjectURL(file) };
      setValue('images', [...existingFiles, newFile]);
      setValue(name, [...existingImageIds, newFile.imageId], { shouldDirty: true, shouldValidate: true });
    },
    onError: (error) => {
      showToast('이미지 업로드 실패. 다시 시도해주세요.');
      console.error('이미지 업로드에 실패했습니다:', error);
    },
  });

  const deleteImageMutation = useMutation({
    mutationFn: deleteImage,
    onSuccess: (_, id) => removeImageAndId(id),
    onError: (error) => {
      showToast('이미지 삭제 실패. 다시 시도해주세요.');
      console.error('이미지 삭제에 실패했습니다:', error);
    },
  });

  // 이미지 업로드 시 실행되는 함수
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      for (const file of Array.from(files)) {
        try {
          if (getValues('images').length >= MAX_IMAGES) break;
          // 이미지 업로드 순차적으로 실행
          await new Promise<void>((resolve, reject) => {
            uploadImageMutation.mutate(file, {
              onSuccess: () => resolve(),
              onError: (error) => reject(error),
            });
          });
        } catch (error) {
          console.error('이미지 업로드 실패:', error);
        }
      }
      e.target.value = '';
    }
  };

  // 특정 이미지를 삭제하는 함수
  const handleDeleteImage = async (id: number) => {
    // 기존의 이미지면 api를 보내지 않고 배열에 저장
    if (defaultImageIds.includes(id)) {
      setDeletedDefaultImageIds([...deletedDefaultImageIds, id]);
      removeImageAndId(id);
      return;
    }
    deleteImageMutation.mutate(id);
  };

  useEffect(() => {
    return () => {
      reset(); // 언마운트 시 deletedDefaultImageIds 값 초기화
    };
  }, [reset]);

  const previewImageStyle =
    'w-[158px] aspect-custom flex-shrink-0 flex justify-center items-center bg-background-light';

  return (
    <HorizontalScroll className="-mx-5 px-5 flex space-x-2">
      {(watch('images') || []).map((image) => {
        const { imageId, url } = image;
        return (
          <PreviewImage
            key={imageId}
            imageId={imageId}
            url={url}
            onDelete={handleDeleteImage}
            classNames={`${previewImageStyle} cursor-grab`}
          />
        );
      })}
      {uploadImageMutation.isPending && (
        <div className={previewImageStyle}>
          <Spinner width={20} />
        </div>
      )}
      {(watch('images') || []).length < MAX_IMAGES && (
        <AddImageBtn handleAddClick={() => fileInputRef.current?.click()} classNames={previewImageStyle} />
      )}
      <input
        type="file"
        accept="image/*"
        multiple
        {...register(name, rules)}
        onChange={handleImageUpload}
        ref={fileInputRef}
        className="hidden"
      />
    </HorizontalScroll>
  );
}

function PreviewImage({ imageId, url, onDelete, classNames }: PreviewImageProps) {
  return (
    <div className={`${classNames} relative`}>
      <Image src={url} alt={`사진 ${imageId}`} width={250} height={250} className="w-full h-full object-cover" />
      <ImgDeleteBtn onClick={() => onDelete(imageId)} className="absolute top-2 right-2 cursor-pointer" />
    </div>
  );
}

function AddImageBtn({ handleAddClick, classNames }: AddImageBtnProps) {
  return (
    <div className={`${classNames} cursor-pointer`} onClick={handleAddClick}>
      <div className="flex flex-col justify-center items-center gap-[2px]">
        <PlusIcon />
        <Text color="gray">사진 추가</Text>
      </div>
    </div>
  );
}
