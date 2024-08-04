import FooterNavi from '@/components/common/FooterNavi';

export default function Mypage() {
  return (
    <>
      <div className="text-center py-3 border-b border-line-lightest">
        <div className="text-xl font-bold">마이페이지</div>
      </div>
      <div className="flex-col py-9 px-5">
        <div className="flex gap-3 items-center mb-6">
          <div>
            <img src="../../public/assets/user_icon.png" alt="" />
          </div>
          <div className="text-xl font-bold">맛있는라면님</div>
        </div>
        <div className="py-4">
          <div>설정</div>
          <a href="/profileedit">내 정보 수정</a>
        </div>
        <div>
          <div>활동</div>
          <div>내 게시물</div>
          <div>내가 좋아요한 게시물</div>
        </div>
      </div>
      <FooterNavi />
    </>
  );
}
