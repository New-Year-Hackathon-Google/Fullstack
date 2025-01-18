export default function AboutPage() {
  return (
    <div className='min-h-screen bg-gray-100 px-4 py-8'>
      <div className='mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md'>
        <h1 className='mb-6 text-2xl font-bold text-gray-800'>서비스 소개</h1>

        <p className='mb-4 text-gray-600'>
          저희 서비스는 가족분들이 시골 요양원에 계신 환자의 상태를 매번
          요양원에 전화를 걸어 확인하는 불편함을 해소하고자 개발되었습니다.
          실시간으로 환자의 상태를 확인하고 필요한 정보를 빠르게 받아볼 수
          있도록 돕는 플랫폼입니다.
        </p>

        <h2 className='mb-2 text-xl font-semibold text-gray-700'>주요 기능</h2>
        <ul className='list-disc space-y-2 pl-5 text-gray-600'>
          <li>환자의 상태를 실시간으로 확인</li>
          <li>환자 상태 기반 AI 분석 제공</li>
          <li>예상되는 질병과 개선 방법 추천</li>
        </ul>

        <h2 className='mb-2 mt-6 text-xl font-semibold text-gray-700'>
          서비스의 장점
        </h2>
        <p className='text-gray-600'>
          저희 플랫폼은 사용하기 쉽고 직관적인 인터페이스를 제공하며, 보호자가
          환자의 건강 상태를 더 효과적으로 관리할 수 있도록 지원합니다. AI
          기술을 통해 환자의 상태를 분석하여 더 나은 치료와 예방 방법을
          제안합니다.
        </p>

        <h2 className='mb-2 mt-6 text-xl font-semibold text-gray-700'>
          연락처
        </h2>
        <p className='text-gray-600'>
          서비스에 대한 더 많은 정보는 아래 연락처로 문의해 주세요.
        </p>
        <p className='pt-5 font-semibold text-gray-600'>
          이메일: eunwoo1341@gmail.com
        </p>
      </div>
    </div>
  );
}
