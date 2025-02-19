import { useState } from 'react';
import { FieldValues, Path, UseFormGetValues, UseFormSetValue } from 'react-hook-form';

interface UseInputDeleteProps<T extends FieldValues> {
  name: Path<T>;
  setValue: UseFormSetValue<T>;
  getValues: UseFormGetValues<T>;
  hideDeleteBtn?: boolean;
}

export default function useInputDelete<T extends FieldValues>({
  name,
  setValue,
  getValues,
  hideDeleteBtn,
}: UseInputDeleteProps<T>) {
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (hideDeleteBtn) return;
    setShowDeleteBtn(!!e.target.value);
  };

  const handleDeleteClick = () => {
    if (hideDeleteBtn) return;
    setValue(name, '' as T[typeof name]);
    setShowDeleteBtn(false);
  };

  const handleFocus = () => {
    if (hideDeleteBtn) return;
    if (getValues(name)) {
      setShowDeleteBtn(true);
    }
  };

  const handleBlur = () => {
    if (hideDeleteBtn) return;
    setShowDeleteBtn(false);
  };

  return {
    showDeleteBtn,
    handleInputChange,
    handleDeleteClick,
    handleFocus,
    handleBlur,
  };
}
