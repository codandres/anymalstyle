import { getUserSession } from '@/helpers/getUserSession';
import { SignIn } from '@/views/auth';
import { redirect } from 'next/navigation';

export default async function SignInPage() {
  const session = await getUserSession();

  if (session) {
    redirect('/');
  }

  return (
    <>
      <SignIn />
    </>
  );
}
