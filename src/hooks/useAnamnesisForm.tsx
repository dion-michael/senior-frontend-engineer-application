import { useCallback, useEffect, useState } from 'react';
import { getFormById } from '../api/forms';

const useAnamnesisForm = (formId?: string) => {
  const [form, setForm] = useState<IForm | null>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const fetchForm = useCallback(async () => {
    try {
      if (formId) {
        setLoading(true);
        const data = await getFormById(formId);
        setForm(data);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [formId]);

  useEffect(() => {
    fetchForm();
  }, [fetchForm]);

  return {
    form,
    refetch: fetchForm,
    loading,
    error
  };
};

export default useAnamnesisForm;
