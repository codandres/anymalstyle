// TODO: PENDIENTE DE FINALIZAR IMPLEMENTACIÓN CON ZOD

'use client';

import { CiSearch } from 'react-icons/ci';
import { Spinner } from '../loaders';
import { useState } from 'react';
import { Formik } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation';

export const SearchProduct = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const search: string | undefined = params.get('nombre') || undefined;

  console.log('search :>> ', search);

  const initialValues: { search?: string } = {
    search,
  };
  const handleSearch = ({ search }: { search?: string }) => {
    setLoading(true);
    console.log('search :>> ', search);

    if (!search) {
      router.push('products');
      // router.refresh();
    } else {
      router.push(`/products?nombre=${search}`);
      // router.refresh();
    }
    setLoading(false);
  };

  return (
    <>
      <div hidden className="md:block">
        <Formik initialValues={initialValues} onSubmit={handleSearch}>
          {({ values, handleSubmit, handleChange, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <div className="relative flex items-center text-gray-400 focus-within:text-vino-500">
                <span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                  {loading ? <Spinner className="text-slate-400 focus-within:text-vino-500" /> : <CiSearch />}
                </span>
                <input
                  type="search"
                  name="search"
                  id="search"
                  placeholder="Buscar producto"
                  className="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-300 focus:border-vino-500 transition"
                  onChange={handleChange}
                  value={values.search}
                  //   defaultValue={values.search}
                />
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};
