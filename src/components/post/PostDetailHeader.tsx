import { useAuthStore } from '@/store/authStore';
import Text from '../common/atom/Text';
import Menu from '../icons/post-menu/Menu';

export default function PostDetailHeader({
  nickname,
  city,
  district,
  modalHandler,
}: {
  nickname: string;
  city: string;
  district: string;
  modalHandler: () => void;
}) {
  const isLogin = useAuthStore((state) => state.isLogin);

  return (
    <div className="px-5 py-2.5 flex justify-between items-center">
      <div className="flex flex-col gap-0.5">
        <Text weight="bold">{nickname}</Text>
        <Text color="gray">{`${city} ${district}`}</Text>
      </div>
      {isLogin && <Menu className="cursor-pointer" onClick={modalHandler} />}
    </div>
  );
}
