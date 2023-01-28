import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { sendMail } from "../../helpers/sendMail";
import ReactGA from "react-ga4";
import { toast } from "react-toastify";

const ContactFunction = () => {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    name: "",
    email: "",
  });
  const [userFeedback, setUserFeedback] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const handleChange = (e) => {
    setUserFeedback("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    ReactGA.event({
      category: "Form submit",
      action: `Submit form with data => Subject: ${formData.subject}, Message: ${formData.message}, Name: ${formData.name}, Email: ${formData.email}`,
    });

    if (formData.name === "") {
      return setUserFeedback("Name is missing, please add a name to perform this action.");
    }

    if (formData.email === "") {
      return setUserFeedback("Email is missing, please add a email to perform this action.");
    }

    if (formData.subject === "") {
      return setUserFeedback("Subject is missing, please add a subject to perform this action.");
    }

    if (formData.message === "") {
      return setUserFeedback("Message is missing, please add a message to perform this action.");
    }

    setIsLoading(true);

    sendMail(formData).then((res) => {
      setIsLoading(false);
      if (res?.ok) {
        setFormData({ subject: "", message: "", name: "", email: "" });
        return toast.success("Email correctly sent, I will get back to you as soon as i can.");
      } else {
        return toast.error("Something went wrong, please try again.");
      }
    });
  };

  return {
    handleChange,
    handleSubmit,
    userFeedback,
    isLoading,
    formData,
  };
};

export default ContactFunction;
