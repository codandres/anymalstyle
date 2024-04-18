import Link from 'next/link';
import { CiBellOn, CiLogin, CiMenuBurger, CiShoppingBasket } from 'react-icons/ci';
import { FiUserCheck } from 'react-icons/fi';
import { LogoutButton } from './auth/LogoutButton';
import { getUserSession } from '@/helpers/auth/getUserSession';
import { User } from 'next-auth';
import { TopMenuItem } from './TopMenuItem';
import { SearchProduct } from './products';

interface MenuItem {
  title: string;
  path: string;
}

const menuItems: MenuItem[] = [
  {
    title: 'Inicio',
    path: '/',
  },
  {
    title: 'Productos',
    path: '/products',
  },
];

export const TopMenu = async () => {
  const cartItemsCount = 0;
  const user: User | undefined = await getUserSession();

  return (
    <>
      <div className="sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5">
        <div className="px-6 flex items-center justify-between space-x-4">
          <div className="flex justify-start items-center">
            <Link href="/">
              <h5 hidden className="text-2xl text-gray-600 font-medium lg:block cursor-pointer">
                Animal Style
              </h5>
            </Link>

            <button className="w-12 h-16 -mr-2 border-r lg:hidden">
              <CiMenuBurger size={30} />
            </button>
            <div className="flex justify-start gap-8 ml-12">
              {menuItems.map((item, index) => (
                <TopMenuItem key={index} {...item} />
              ))}
            </div>
          </div>

          <div className="flex space-x-2">
            <SearchProduct />

            <Link
              href={'#'}
              className="p-2 flex items-center justify-center h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200"
            >
              {cartItemsCount > 0 && <span className="text-sm mr-2 text-blue-600 font-bold">{cartItemsCount}</span>}
              <CiShoppingBasket size={25} />
            </Link>
            <button className="flex items-center justify-center w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200">
              <CiBellOn size={25} />
            </button>

            <Link
              href={'/signin'}
              className="flex items-center justify-center w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200"
            >
              {user ? <FiUserCheck size={25} /> : <CiLogin size={25} />}
            </Link>
            <div className="ml-2">
              <p>
                {user && `Hola ${user.name || 'Usuario'}!`}
                <span className="text-vino-700 font-bold text-xs ml-1">{user?.role}</span>
              </p>
              <p>{user && <LogoutButton />}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
