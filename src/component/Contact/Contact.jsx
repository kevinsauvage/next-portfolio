import styles from "./Contact.module.scss";
import Section from "../Section/Section";
import Title from "../Title/Title";
import UpTitle from "../UpTitle/UpTitle";
import { useState } from "react";
import { BiMailSend } from "react-icons/bi";
import { SiGmail } from "react-icons/si";
import { AiOutlineGithub } from "react-icons/ai";
import { ImLinkedin2 } from "react-icons/im";
import { ClipLoader } from "react-spinners";
import { sendMail } from "../../helpers/sendMail";
import { MdLocationOn, MdMail } from "react-icons/md";
import SlideUpAndFadeIn from "../SlideUpAndFadeIn/SlideUpAndFadeIn";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactGA from "react-ga";
import getdateAndTime from "../../helpers/getDateAndTime";

const Contact = () => {
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
      action: `Submit form with data => Subject: ${formData.subject}, Message: ${
        formData.message
      }, Name: ${formData.name}, Email: ${formData.email} the ${getdateAndTime().date} at time : ${
        getdateAndTime().time
      }`,
    });

    if (formData.name === "") {
      setUserFeedback("Name is missing, please add a name to perfom this action.");
      return;
    }

    if (formData.email === "") {
      setUserFeedback("Email is missing, please add a email to perfom this action.");
      return;
    }

    if (formData.subject === "") {
      setUserFeedback("Subject is missing, please add a subject to perfom this action.");
      return;
    }

    if (formData.message === "") {
      setUserFeedback("Message is missing, please add a message to perfom this action.");
      return;
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
      action: `Contact linkedin clicked, the ${getdateAndTime().date} at time : ${
        getdateAndTime().time
      }`,
    });
    window.open("https://www.linkedin.com/in/kevin-sauvage/");
  };

  const handleClickGithub = () => {
    ReactGA.event({
      category: "Links",
      action: `Contact github clicked, the ${getdateAndTime().date} at time : ${
        getdateAndTime().time
      }`,
    });
    window.open("https://github.com/kevinsauvage");
  };

  const handleClickMail = () => {
    ReactGA.event({
      category: "Links",
      action: `Contact mail clicked, the ${getdateAndTime().date} at time : ${
        getdateAndTime().time
      }`,
    });
    window.open("mailto:kevinsauvage@outlook.com");
  };

  return (
    <Section id="contact" className={styles["Contact"]}>
      <UpTitle text="SOMETHING TO SAY" />
      <Title>Get in touch</Title>
      <div className={styles["Contact__container"]}>
        <SlideUpAndFadeIn className={styles["Contact__info"]}>
          <div>
            <p className={styles["Contact__info-name"]}>Kévin Sauvage</p>
            <p className={styles["Contact__info-job"]}>- Front end developer -</p>
          </div>
          <div className={styles["Contact__info-row"]}>
            <MdMail />
            <p>kevinsauvage@outlook.com</p>
          </div>
          <div className={styles["Contact__info-row"]}>
            <MdLocationOn />
            <p>Barcelona, SPAIN</p>
          </div>
          <div className={styles["Contact__social"]}>
            <div onClick={() => handleClickLinkedin()} className={styles["Contact__social-icon"]}>
              <ImLinkedin2 />
              <span>Linkedin</span>
            </div>
            <div className={styles["Contact__social-icon"]} onClick={() => handleClickGithub()}>
              <AiOutlineGithub />
              <span>Github</span>
            </div>
            <div onClick={() => handleClickMail()} className={styles["Contact__social-icon"]}>
              <SiGmail />
              <span>E-mail</span>
            </div>
          </div>
        </SlideUpAndFadeIn>
        <form
          action="submit"
          className={styles["Contact__form"]}
          onSubmit={handleSubmit}
          autoComplete="off">
          <SlideUpAndFadeIn className={styles["Contact__form-input-container"]}>
            <div className={styles["Contact__form-row"]}>
              <input
                className={styles["Contact__form-input"]}
                type="text"
                name="name"
                value={formData.name}
                placeholder="Name"
                onChange={handleChange}
              />
              <input
                className={styles["Contact__form-input"]}
                type="email"
                name="email"
                value={formData.email}
                placeholder="Email"
                onChange={handleChange}
              />
            </div>
            <input
              className={styles["Contact__form-input"]}
              type="text"
              name="subject"
              value={formData.subject}
              placeholder="Subject"
              onChange={handleChange}
            />
            <textarea
              className={styles["Contact__form-text-area"]}
              name="message"
              cols="30"
              rows="10"
              value={formData.message}
              placeholder="Message"
              onChange={handleChange}></textarea>
            {userFeedback && (
              <div className={styles["Contact__form-feedback"]}>
                <p>{userFeedback}</p>
              </div>
            )}
            <button className={styles["Contact__btn"]}>
              {isLoading ? (
                <ClipLoader color="white" />
              ) : (
                <>
                  SEND <BiMailSend />
                </>
              )}
            </button>
          </SlideUpAndFadeIn>
        </form>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Section>
  );
};

export default Contact;
