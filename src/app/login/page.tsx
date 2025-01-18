import GoogleAuthButton from './_components/GoogleAuthButton';

export default function LoginPage() {
  return (
    <div className='mt-[200px] flex min-h-screen w-full flex-col items-center'>
      <main>
        <GoogleAuthButton />
      </main>
    </div>
  );
}
