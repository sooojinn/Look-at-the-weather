import { useState } from 'react';
import QuestionMark from '../../icons/QuestionMark';
import TodayBestWearCriteriaModal from '../../modal/TodayBestWearCriteriaModal';

export default function TodayBestWearCriteriaBtn() {
  const [showDescModal, setShowDescModal] = useState(false);

  return (
    <>
      <div
        onClick={() => {
          setShowDescModal(true);
        }}
      >
        <QuestionMark className="cursor-pointer" />
      </div>
      {showDescModal && (
        <TodayBestWearCriteriaModal
          onContinue={() => {
            setShowDescModal(false);
          }}
        />
      )}
    </>
  );
}
