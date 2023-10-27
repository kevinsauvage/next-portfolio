'use client';

import { useCallback, useState } from 'react';

const useForm = (onSubmit, initialValues = {}) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState(() => {
    const initialFormData = {};
    Object.keys(initialValues).forEach((key) => {
      initialFormData[key] = initialValues[key] || '';
    });
    return initialFormData;
  });

  const handleInputChange = useCallback((target) => {
    const { name, value } = target;
    setFormData((previousFormData) => ({ ...previousFormData, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setLoading(true);
      const response = await onSubmit?.(formData, () => setFormData(initialValues));
      setLoading(false);
      if (response) setFormData(initialValues || {});
    },
    [formData, initialValues, onSubmit]
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
