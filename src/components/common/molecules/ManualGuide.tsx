import { useGuideManageStore } from '@/store/guideManageStore';

export default function ManualGuide() {
  const { isManualGuideModalOpen, setIsManualGuideModal } = useGuideManageStore();
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-opacity-black70 flex justify-center items-center z-50">
      <div className="absolute bottom-0 bg-white px-5 rounded-3xl max-w-md w-full"></div>
    </div>
  );
}
