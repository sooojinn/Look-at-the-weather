import { BASEURL } from '@/config/constants';
import { PostFormData } from '@/config/types';
import Text from '@components/common/atom/Text';
import ImgDeleteIcon from '@components/icons/ImgDeleteIcon';
import PlusIcon from '@components/icons/PlusIcon';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { UseFormSetValue } from 'react-hook-form';

interface FileProps {
  setValue: UseFormSetValue<PostFormData>;
}

interface ImageItem {
  id: number;
  url: string;
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

export default function File({ setValue }: FileProps) {
  const [selectedImages, setSelectedImages] = useState<ImageItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_IMAGES = 3;

  const mutation = useMutation({
    mutationFn: postImage,
    onSuccess: (data: { id: number }, file: File) => {
      setSelectedImages((prevImages) => {
        const newImage = {
          id: data.id,
          url: URL.createObjectURL(file),
        };
        return [...prevImages, newImage].slice(0, MAX_IMAGES);
      });
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        mutation.mutate(file);
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
    // selectedImages가 변경될 때마다 ImageId 필드 업데이트
    const imageIds = selectedImages.map((image) => image.id);
    setValue('imageId', imageIds);
  }, [selectedImages, setValue]);

  return (
    <>
      <div className="flex space-x-2 overflow-auto scrollbar-hide">
        {selectedImages.map((image) => {
          const { id, url } = image;
          return <PreviewImage key={id} id={id} url={url} onDelete={handleDeleteImage} />;
        })}
        {selectedImages.length < MAX_IMAGES && <AddImageBtn handleAddClick={handleAddClick} />}
      </div>
      <input type="file" accept="image/*" multiple onChange={handleImageUpload} ref={fileInputRef} className="hidden" />
    </>
  );
}

function PreviewImage({ id, url, onDelete }: PreviewImageProps) {
  return (
    <div className="w-[158px] h-[197px] flex-shrink-0 bg-background-light relative">
      <img src={url} alt={`사진 ${id}`} className="w-full h-full object-cover" />
      <button onClick={() => onDelete(id)} className="absolute top-2 right-2">
        <ImgDeleteIcon />
      </button>
    </div>
  );
}

function AddImageBtn({ handleAddClick }: AddImageBtnProps) {
  return (
    <div
      className="w-[158px] h-[197px] bg-background-light flex justify-center items-center flex-shrink-0 cursor-pointer"
      onClick={handleAddClick}
    >
      <div className="flex flex-col justify-center items-center gap-[2px]">
        <PlusIcon />
        <Text color="gray">사진 추가</Text>
      </div>
    </div>
  );
}
