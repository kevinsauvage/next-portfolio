import { useState } from 'react';
import { toast } from 'react-toastify';

import sendMail from '../../helpers/sendMail';

import 'react-toastify/dist/ReactToastify.css';

const ContactFunction = () => {
  const [formData, setFormData] = useState({
    email: '',
    message: '',
    name: '',
    subject: '',
  });
  const [userFeedback, setUserFeedback] = useState('');
  const [isLoading, setIsLoading] = useState('');

  const handleChange = (event) => {
    setUserFeedback('');
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.name === '') {
      return setUserFeedback('Name is missing, please add a name to perform this action.');
    }

    if (formData.email === '') {
      return setUserFeedback('Email is missing, please add a email to perform this action.');
    }

    if (formData.subject === '') {
      return setUserFeedback('Subject is missing, please add a subject to perform this action.');
    }

    if (formData.message === '') {
      return setUserFeedback('Message is missing, please add a message to perform this action.');
    }

    setIsLoading(true);

    sendMail(formData).then((response) => {
      setIsLoading(false);
      if (response?.ok) {
        setFormData({ email: '', message: '', name: '', subject: '' });
        return toast.success('Email correctly sent, I will get back to you as soon as i can.');
      }
      return toast.error('Something went wrong, please try again.');
    });
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    isLoading,
    userFeedback,
  };
};

export default ContactFunction;
