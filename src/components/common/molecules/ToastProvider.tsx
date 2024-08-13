import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Text from '../atom/Text';

export function ToastProvider() {
  return (
    <ToastContainer
      autoClose={4000}
      hideProgressBar
      closeButton={false}
      newestOnTop={false}
      transition={Slide}
      position="bottom-center"
      theme="dark"
      toastClassName={() => 'w-[335px] h-[44px] flex items-center fixed bottom-24 bg-lightBlack opacity-90 rounded-lg'}
    />
  );
}

export function showToast(message: string, cancelBtnText: string = '', onCancel: () => void = () => {}) {
  toast(
    <div className="w-full flex justify-between items-center px-5">
      <Text size="s" color="white">
        {message}
      </Text>
      <button onClick={onCancel} className="underline text-s font-bold">
        {cancelBtnText}
      </button>
    </div>,
  );
}
