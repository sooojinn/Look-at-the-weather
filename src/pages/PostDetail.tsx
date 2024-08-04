import { useState } from 'react';
import Header from '@components/common/Header';
import Text from '@components/common/atom/Text';
import Menu from '@components/icons/Menu';
import HeartIcon from '@components/icons/HeartIcon';
import PostManageModal from '@components/common/molecules/PostManageModal';

export default function PostDetail() {
  const [modalOpen, setModalOpen] = useState(false);
  const modalHandler = () => {
    setModalOpen(true);
  };

  return (
    <div className="relative">
      <Header />
      <div className="px-5">
        <div className="flex justify-between items-center">
          <div className="my-2.5">
            <Text weight="bold">title</Text>
            <Text color="gray">region</Text>
          </div>
          <div onClick={modalHandler}>
            <Menu />
          </div>
        </div>
      </div>
      <div>
        <img
          className="w-full"
          src="https://img3.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202210/12/kncom/20221012135123984gqor.png"
        />
      </div>
      <div className="px-5">
        <div className="flex gap-1.5 my-4 items-center">
          <HeartIcon fill={'#858588'} postId={1} />
          <Text color="lightGray">33</Text>
        </div>
        <div className="flex flex-col gap-4">
          <Text size="l" weight="bold">
            8월 1일 착장입니다.
          </Text>
          <Text color="lightBlack">
            본문은 공백포함 300자입니다.본문은 공백포함 300자입니다.본문은 공백포함 300자입니다.본문은 공백포함
            300자입니다.본문은 공백포함 300자입니다.본문은 공백포함 300자입니다.본문은 공백포함 300자입니다.본문은
            공백포함 300자입니다.본문은 공백포함 300자입니다.본문은 공백포함 300자입니다.
          </Text>
        </div>
        <div className="mt-2.5 mb-4">
          <Text color="gray">2024.08.01 12:42</Text>
        </div>
        <div className="flex flex-row p-5 bg-background-light rounded-[10px]">
          <div className="mr-5">
            <div className="flex flex-row gap-2.5">
              <Text>날씨</Text>
              <Text color="gray">흐림 맑음</Text>
            </div>
            <div className="flex flex-row gap-2.5">
              <Text>계절</Text>
              <Text color="gray">여름</Text>
            </div>
          </div>
          <div>
            <div className="flex flex-row gap-2.5">
              <Text>온도</Text>
              <Text color="gray">더워요 쌀쌀해요</Text>
            </div>
          </div>
        </div>
      </div>
      {modalOpen ? (
        <>
          <PostManageModal modalController={setModalOpen} />
        </>
      ) : null}
    </div>
  );
}
