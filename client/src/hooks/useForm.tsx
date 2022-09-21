import { useState, useCallback, ChangeEvent } from "react";

interface UseFormProps {
  handleChange: (event: ChangeEvent<Record<string, string>>) => void;
  values: Record<string, string>;
  updateValues: (newVal: Record<string, string>) => void;
  deleteValue: (key: string) => void;
  clearForm: () => void;
}

function useForm(initialState: Record<string, string> = {}): UseFormProps {
  const [values, setValues] = useState<Record<string, string>>(initialState);

  const updateValues = useCallback((newVal: Record<string, string>) => {
    setValues((v) => ({ ...v, ...newVal }));
  }, []);

  const deleteValue = useCallback((key: string) => {
    setValues((v) => {
      const ret = { ...v };
      delete ret[key];
      return ret;
    });
  }, []);

  const handleChange = useCallback((e: ChangeEvent<Record<string, string>>) => {
    if (e.persist) e.persist();
    const { value, type, checked, name } = e.target;
    const val = type === "checkbox" ? checked : value;
    setValues((v) => ({ ...v, [name]: val }));
  }, []);

  const clearForm = useCallback(() => {
    setValues({});
  }, []);

  return {
    handleChange,
    values,
    updateValues,
    deleteValue,
    clearForm,
  };
}

export default useForm;
