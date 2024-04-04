import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { TopMenu } from '@/components/TopMenu';
import { AuthProvider } from '@/components/auth/AuthProvider';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Animal Style',
  description: 'El paraiso de las mascotas',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="m-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
            {/* <div className="m-auto mb-6"> */}
            <TopMenu />

            <div className="px-6 pt-6 bg-white p-2 m-2 pb-5 rounded">{children}</div>
          </div>
          {/* {children} */}
          <Toaster position="bottom-right" />
        </body>
      </html>
    </AuthProvider>
  );
}
