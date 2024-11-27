import { toast, ToastContainer, cssTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Text from '../atom/Text';

const CustomTransition = cssTransition({
  enter: 'animate-slideUp',
  exit: 'animate-fadeOut',
});

export function ToastProvider() {
  return (
    <ToastContainer
      hideProgressBar
      closeOnClick
      closeButton={false}
      pauseOnHover={false}
      pauseOnFocusLoss={false}
      transition={CustomTransition}
      position="bottom-center"
      theme="dark"
      toastClassName={() => 'fixed bottom-24 w-full flex justify-center items-center'}
      bodyClassName={() => 'max-w-[335px] w-[90%] px-5 py-3 bg-opacity-lightBlack90 rounded-lg'}
    />
  );
}

export function showToast(message: string, cancelBtnText: string = '', onCancel: () => void = () => {}) {
  const toastId = toast(
    <div className="flex justify-between items-center">
      <Text size="s" color="white">
        {message}
      </Text>
      {cancelBtnText && (
        <button
          onClick={() => {
            onCancel();
            toast.dismiss(toastId); // 버튼 클릭 시 토스트 닫기
          }}
          className="underline text-s font-bold ml-2 whitespace-nowrap"
        >
          {cancelBtnText}
        </button>
      )}
    </div>,
    {
      autoClose: message.length > 20 ? 3000 : 2000, // 계산된 autoClose 적용
    },
  );
}
