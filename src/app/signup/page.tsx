import { getUserSession } from '@/helpers/getUserSession';
import { SignUp } from '@/views/auth';
import { redirect } from 'next/navigation';

export default async function SignUpPage() {
  const session = await getUserSession();

  if (session) {
    redirect('/');
  }

  return (
    <>
      <SignUp />
    </>
  );
}
