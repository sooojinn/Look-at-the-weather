import { BASEURL } from '@/config/constants';
import { PostFormData } from '@/config/types';
import Text from '@components/common/atom/Text';
import ImgDeleteIcon from '@components/icons/ImgDeleteIcon';
import PlusIcon from '@components/icons/PlusIcon';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { RegisterOptions, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import Spinner from '@components/icons/Spinner';

export interface FileProps {
  name: keyof PostFormData;
  rules?: RegisterOptions<PostFormData, keyof PostFormData>;
  setValue: UseFormSetValue<PostFormData>;
  register: UseFormRegister<PostFormData>;
}

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

const postImage = async (file: File): Promise<{ id: number }> => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post(`${BASEURL}/api/v1/s3/post-image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  return response.data;
};

export default function File({ name, rules, setValue, register }: FileProps) {
  const [selectedImages, setSelectedImages] = useState<ImageItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_IMAGES = 3;

  const mutation = useMutation({
    mutationFn: postImage,
    onSuccess: (data: { id: number }, file: File) => {
      setSelectedImages((prevImages) => {
        const updatedImages = prevImages.map((img) => (img.tempId === file.name ? { ...img, id: data.id } : img));
        return updatedImages;
      });
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const fileExists = selectedImages.some((img) => img.tempId === file.name);
        if (!fileExists) {
          setSelectedImages((prevImages) => {
            const newImage = {
              url: URL.createObjectURL(file),
              tempId: file.name,
            };
            return [...prevImages, newImage].slice(0, MAX_IMAGES);
          });
          mutation.mutate(file);
        }
      });
    }
  };

  console.log(selectedImages);

  const handleAddClick = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteImage = (id: number) => {
    setSelectedImages((prevImages) => {
      const imageToDelete = prevImages.find((img) => img.id === id);
      if (imageToDelete) {
        URL.revokeObjectURL(imageToDelete.url);
      }
      return prevImages.filter((img) => img.id !== id);
    });
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
      {id && <ImgDeleteIcon id={id} onClick={onDelete} />}
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
