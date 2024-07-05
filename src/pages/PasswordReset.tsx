import PageTitle from '../components/common/PageTitle';

export default function PasswordReset() {
  return (
    <div className="flex flex-col justify-between h-screen">
      <PageTitle title="비밀번호 재설정" />
      <form className="flex flex-col px-5">
        <div>
          <label className="block mb-2 my-4 text-gray-600 font-bold">
            새 비밀번호<span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="영문/숫자/특수문자 2가지 이상 조합 (8~15자)"
          />
        </div>
        <div>
          <label className="block mb-2 my-4 text-gray-600 font-bold">
            비밀번호 확인<span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="비밀번호를 한번 더 입력해 주세요."
          />
        </div>
      </form>
      <div className="mt-auto mb-10 mx-5">
        <button
          type="submit"
          className="font-bold w-full bg-interactive-light hover:bg-primary-lightest hover:text-white rounded-lg py-3 px-4"
        >
          비밀번호 재설정하기
        </button>
      </div>
    </div>
  );
}
