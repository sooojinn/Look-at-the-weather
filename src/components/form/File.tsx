import Text from '@components/common/atom/Text';
import ImgDeleteIcon from '@components/icons/ImgDeleteIcon';
import PlusIcon from '@components/icons/PlusIcon';
import React, { useState, useRef } from 'react';

interface AddImageBtnProps {
  handleAddClick: () => void;
}

export default function File() {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_IMAGES = 3;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
      setSelectedImages((prevImages) => {
        const updatedImages = [...prevImages, ...newImages].slice(0, MAX_IMAGES);
        return updatedImages;
      });
    }
  };

  const handleAddClick = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteImage = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="flex space-x-2 overflow-auto scrollbar-hide">
        {selectedImages.map((image, index) => (
          <div key={index} className="w-[158px] h-[197px] flex-shrink-0 bg-background-light relative">
            <img src={image} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
            <button onClick={() => handleDeleteImage(index)} className="absolute top-2 right-2">
              <ImgDeleteIcon />
            </button>
          </div>
        ))}
        {selectedImages.length < MAX_IMAGES && <AddImageBtn handleAddClick={handleAddClick} />}
      </div>
      <input type="file" accept="image/*" multiple onChange={handleImageUpload} ref={fileInputRef} className="hidden" />
    </>
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
