import PageTitle from '../components/common/PageTitle';

export default function ProfileEdit() {
  return (
    <div className="flex flex-col justify-between h-screen">
      <PageTitle title="개인정보 수정" />
      <form className="flex flex-col px-5">
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
            비밀번호<span className="text-red-500">*</span>
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
        <div>
          <label className="block mb-2 my-4 text-gray-600 font-bold">
            이름<span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="이름(성별)을 입력해 주세요."
          />
        </div>
        <div>
          <label className="block mb-2 my-4 text-gray-600 font-bold">
            닉네임<span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-3">
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="한/영 10자 이내,특수문자,공백 불가"
            />
            <button
              type="button"
              className="rounded-lg bg-interactive-light hover:bg-primary-lightest py-3 px-4 whitespace-nowrap"
            >
              중복 확인
            </button>
          </div>
        </div>
      </form>
      <div className="mt-auto mb-10 mx-5">
        <button
          type="submit"
          className="font-bold w-full bg-interactive-light hover:bg-primary-lightest hover:text-white rounded-lg py-3 px-4"
        >
          수정하기
        </button>
      </div>
    </div>
  );
}
