import { useCallback, useEffect, useState } from 'react';
import { createForm, getAllForms } from '../api/forms';
import useDebounce from './useDebounce';
import getRandomId from '../utils/getRandomId';

interface IUseForm {
  loading: boolean;
  data: IForm[];
  error: unknown | null;
  prevPage: () => void;
  nextPage: () => void;
  fetchData: () => void;
  setLimit: (limit: number) => void;
  page: number;
  limit: number;
  pageCount: number;
  addForm: () => Promise<IForm>;
}

export const useFormsData: (params: GetAllFormsParams) => IUseForm = ({
  page = 1,
  limit = 10,
  sorting,
  query
}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IFormResponse>({
    data: [],
    pageCount: 1
  });
  const [error, setError] = useState<unknown | null>(null);
  const [currentPage, setPage] = useState(page);
  const [currentLimit, setLimit] = useState(limit);
  const debouncedQuery = useDebounce(query as string, 500);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const q = debouncedQuery?.length >= 3 ? debouncedQuery : undefined;
      const forms = await getAllForms({
        page: currentPage,
        limit: currentLimit,
        sorting,
        query: q
      });
      setData(forms);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, currentLimit, sorting, debouncedQuery]);

  const addForm = useCallback(async () => {
    const date = new Date().toISOString();
    const formToAdd: IForm = {
      id: getRandomId(),
      created_at: date,
      form_name: '',
      sections: [],
      updated_at: date,
      description: ''
    };
    const response = await createForm(formToAdd);
    await fetchData();
    return response;
  }, [fetchData]);

  const nextPage = () => setPage((page) => page + 1);
  const prevPage = () => setPage((page) => (page > 1 ? page - 1 : 1));

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    loading,
    pageCount: data.pageCount,
    data: data.data,
    error,
    fetchData,
    addForm,
    nextPage,
    prevPage,
    setLimit,
    page: currentPage,
    limit: currentLimit
  };
};
