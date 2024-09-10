import { useEffect } from 'react';
import CloseBtn from '@components/icons/CloseBtn';
import ReportIcon from '@components/icons/ReportIcon';
import HideIcon from '@components/icons/HideIcon';
import DeleteIcon from '@components/icons/DeleteIcon';
import EditIcon from '@components/icons/EditIcon';
import Text from '../atom/Text';

type ModalType = {
  modalController: React.Dispatch<React.SetStateAction<boolean>>;
  option?: string;
};

export default function PostManageModal({ modalController, option }: ModalType) {
  const onClickCloseBtn = () => {
    modalController(false);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
      <div className={'max-w-md fixed bottom-0 w-full bg-white shadow-md z-20 h-[212px]'}>
        <div className="bg-background-white w-full px-5 pt-4 pb-10 rounded-t-3xl">
          <div className="flex justify-end mb-9">
            <CloseBtn onClick={onClickCloseBtn} />
          </div>
          <div>
            {option && option === 'M' ? (
              <div>
                <div className="flex gap-3 py-3 items-center">
                  <EditIcon />
                  <Text size="l">수정하기</Text>
                </div>
                <div className="flex gap-3 py-3 items-center">
                  <DeleteIcon />
                  <Text size="l">삭제하기</Text>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex gap-3 p-3 py-3 items-center">
                  <HideIcon />
                  <Text size="l">해당 게시물 숨기기</Text>
                </div>
                <div className="flex gap-3 p-3 py-3 items-center">
                  <ReportIcon />
                  <Text size="l">신고하기</Text>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
