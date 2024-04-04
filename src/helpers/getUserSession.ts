import { getServerSession, User as UserSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const getUserSession = async (): Promise<UserSession | undefined> => {
  return getServerSession(authOptions).then((session) => session?.user);
};
