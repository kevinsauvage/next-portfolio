import { ChangeEvent, FormEvent, useCallback, useState } from 'react';

type formDataType = {
  [key: string]: string;
};

type FormData = {
  [key: string]: string;
};

interface useFormProperties {
  onSubmit: (formData: formDataType, clearInputs: () => void) => Promise<void>;
  initialValues?: FormData;
}

const useForm = ({ onSubmit, initialValues = {} }: useFormProperties) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>(() => {
    const initialFormData: FormData = {};
    Object.keys(initialValues).forEach((key) => {
      initialFormData[key] = initialValues[key] || '';
    });
    return initialFormData;
  });

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setFormData((previousFormData) => ({ ...previousFormData, [name]: value }));
    },
    [],
  );

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      setLoading(true);
      await onSubmit?.(formData, () => setFormData(initialValues));
      setLoading(false);
    },
    [formData, initialValues, onSubmit],
  );

  return {
    formData,
    handleInputChange,
    handleSubmit,
    loading,
    setFormData,
  };
};

export default useForm;
