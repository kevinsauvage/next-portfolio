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
      return setUserFeedback("Name is missing, please add a name to perfom this action.");
    }

    if (formData.email === "") {
      return setUserFeedback("Email is missing, please add a email to perfom this action.");
    }

    if (formData.subject === "") {
      return setUserFeedback("Subject is missing, please add a subject to perfom this action.");
    }

    if (formData.message === "") {
      return setUserFeedback("Message is missing, please add a message to perfom this action.");
    }

    setIsLoading(true);

    sendMail(formData).then((res) => {
      setIsLoading(false);
      if (res && res?.statusText === "OK") {
        setFormData({ subject: "", message: "", name: "", email: "" });

        return toast.success("Email correctly sent, I will get back to you as soon as i can.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        return toast.error("Oups, something went wrong, please try again.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    });
  };

  const handleClickLinkedin = () => {
    ReactGA.event({
      category: "Links",
      action: `Contact linkedin clicked`,
    });
    window.open("https://www.linkedin.com/in/kevin-sauvage/");
  };

  const handleClickGithub = () => {
    ReactGA.event({
      category: "Links",
      action: `Contact github clicked`,
    });
    window.open("https://github.com/kevinsauvage");
  };

  const handleClickMail = () => {
    ReactGA.event({
      category: "Links",
      action: `Contact mail clicked`,
    });
    window.open("mailto:kevinsauvage@outlook.com");
  };

  return {
    handleChange,
    handleClickGithub,
    handleClickMail,
    handleClickLinkedin,
    handleSubmit,
    userFeedback,
    isLoading,
    formData,
  };
};

export default ContactFunction;
