import PageTitle from '../components/common/PageTitle';

export default function FindPassword() {
  return (
    <div className="flex flex-col justify-between h-screen">
      <PageTitle title="비밀번호 찾기" />
      <form className="flex flex-col px-5">
        <div>
          <label className="block mb-2 my-4 text-gray-600 font-bold">
            이메일<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="(예시) abcde@naver.com"
          />
        </div>
        <div>
          <label className="block mb-2 my-4 text-gray-600 font-bold">
            이름<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="이름(성별)을 입력해 주세요."
          />
        </div>
        <div>
          <label className="block mb-2 my-4 text-gray-600 font-bold">
            닉네임<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="닉네임을 입력해 주세요."
          />
        </div>
      </form>
      <div className="mt-auto mb-10 mx-5">
        <button
          type="submit"
          className="font-bold w-full bg-interactive-light hover:bg-primary-lightest hover:text-white rounded-lg py-3 px-4"
        >
          비밀번호 찾기
        </button>
      </div>
    </div>
  );
}
