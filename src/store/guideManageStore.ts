import { create } from 'zustand';

interface guideManageStoreProps {
  isLookGuideModalOpen: boolean;
  isManualGuideModalOpen: boolean;
  setIsLookGuideModal: (isOpen: boolean) => void;
  setIsManualGuideModal: (isOpen: boolean) => void;
}

export const useGuideManageStore = create<guideManageStoreProps>()((set) => ({
  isLookGuideModalOpen: false,
  isManualGuideModalOpen: false,
  setIsLookGuideModal: (isOpen: boolean) => set({ isLookGuideModalOpen: isOpen }),
  setIsManualGuideModal: (isOpen: boolean) => set({ isManualGuideModalOpen: isOpen }),
}));
