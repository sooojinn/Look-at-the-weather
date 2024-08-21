import CheckBoxBtn from '@components/icons/CheckBoxBtn';
import { useState } from 'react';
import Text from '../atom/Text';
import ToggleBtn from '@components/icons/ToggleBtn';
import MarkdownRenderer from './MarkdownRenderer';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface LocationTermsCheckBoxProps {
  register: UseFormRegister<FieldValues>;
}

export default function LocationTermsCheckBox({ register }: LocationTermsCheckBoxProps) {
  const [showTerms, setShowTerms] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const toggleTerms = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowTerms(!showTerms);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div>
      <div className="h-12 flex justify-between items-center cursor-pointer">
        <label htmlFor="terms" className="cursor-pointer flex items-center">
          <input
            type="checkbox"
            id="terms"
            className="hidden"
            checked={isChecked}
            onClick={handleCheckboxChange}
            {...register('terms', { required: '위치 정보 이용약관에 동의해주세요' })}
          />
          <CheckBoxBtn isChecked={isChecked} />
          <Text color="black">위치 정보 이용약관(필수)</Text>
        </label>
        <ToggleBtn onClick={toggleTerms} showTerms={showTerms} />
      </div>
      {showTerms && <LocationTerms />}
    </div>
  );
}

function LocationTerms() {
  return (
    <div className="px-3 pt-[14px] pb-10 mb-10 bg-background-light rounded-[10px]">
      <MarkdownRenderer markdownTitle="location-terms" color="black" />
    </div>
  );
}
