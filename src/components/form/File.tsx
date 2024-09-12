import { BASEURL } from '@/config/constants';
import { FileProps } from '@/config/types';
import Text from '@components/common/atom/Text';
import ImgDeleteIcon from '@components/icons/ImgDeleteIcon';
import PlusIcon from '@components/icons/PlusIcon';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import Spinner from '@components/icons/Spinner';
import { showToast } from '@components/common/molecules/ToastProvider';

interface ImageItem {
  id?: number;
  url: string;
  tempId?: string;
}

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
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  return response.data;
};

// 이미지 삭제 함수
const deleteImage = async (id: number) => {
  await axios.delete(`${BASEURL}/s3/post-image/${id}`, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
};

export default function File({ name, rules, setValue, register }: FileProps) {
  const [selectedImages, setSelectedImages] = useState<ImageItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_IMAGES = 3;

  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data, file) => {
      // 파일명이 같은 객체에 id 값 추가
      setSelectedImages((prevImages) => {
        const updatedImages = prevImages.map((img) => (img.tempId === file.name ? { ...img, id: data.id } : img));
        return updatedImages;
      });
    },
    onError: (_, file) => {
      showToast('이미지 업로드 실패. 다시 시도해주세요.');
      // id 요청에 실패한 이미지는 selectedImages에서 삭제
      removeImageFromSelection('tempId', file.name);
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
        // 이미 업로드된 이미지가 아닐 때만 추가
        const fileExists = selectedImages.some((img) => img.tempId === file.name);
        if (!fileExists) {
          setSelectedImages((prevImages) => {
            const newImage = {
              url: URL.createObjectURL(file),
              tempId: file.name,
            };
            return [...prevImages, newImage].slice(0, MAX_IMAGES);
          });
          uploadImageMutation.mutate(file);
        }
      });
    }
  };

  // 이미지 추가 함수
  const handleAddClick = () => {
    fileInputRef.current?.click();
  };

  // 특정 이미지를 selectedImages에서 삭제하는 함수
  const removeImageFromSelection = (key: 'id' | 'tempId', value: string | number) => {
    setSelectedImages((prevImages) => {
      const imageToDelete = prevImages.find((img) => img[key] === value);
      if (imageToDelete) {
        URL.revokeObjectURL(imageToDelete.url);
      }
      return prevImages.filter((img) => img[key] !== value);
    });

    // 파일 입력 요소 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 이미지 미리보기 삭제 함수
  const handleDeleteImage = async (id: number) => {
    removeImageFromSelection('id', id);
    deleteMutation.mutate(id);
  };

  useEffect(() => {
    // selectedImages가 변경될 때마다 ImageId 필드 업데이트 및 유효성 검사
    const imageIds = selectedImages.map((image) => image.id).filter((id): id is number => id !== undefined);
    setValue(name, imageIds, { shouldValidate: true });
  }, [selectedImages, setValue]);

  return (
    <>
      <div className="h-[197px] flex space-x-2 overflow-auto scrollbar-hide">
        {selectedImages.map((image) => {
          const { id, url, tempId } = image;
          return <PreviewImage key={tempId} id={id} url={url} onDelete={handleDeleteImage} />;
        })}
        {selectedImages.length < MAX_IMAGES && <AddImageBtn handleAddClick={handleAddClick} />}
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

function PreviewImage({ id, url, onDelete }: PreviewImageProps) {
  return (
    <div className="w-[158px] flex-shrink-0 flex justify-center items-center bg-background-light relative">
      <img src={url} alt={`사진 ${id}`} className="w-full h-full object-cover" />
      {!id && (
        <div className="absolute inset-0 bg-black opacity-30 flex justify-center items-center">
          <Spinner />
        </div>
      )}
      {id && <ImgDeleteIcon id={id} onDelete={onDelete} />}
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
