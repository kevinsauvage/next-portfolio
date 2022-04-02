import styles from "./Contact.module.scss";
import Section from "../Section/Section";
import Title from "../Title/Title";
import UpTitle from "../UpTitle/UpTitle";
import { BiMailSend } from "react-icons/bi";
import { SiGmail } from "react-icons/si";
import { AiOutlineGithub } from "react-icons/ai";
import { ImLinkedin2 } from "react-icons/im";
import { ClipLoader } from "react-spinners";
import { MdLocationOn, MdMail } from "react-icons/md";
import SlideUpAndFadeIn from "../SlideUpAndFadeIn/SlideUpAndFadeIn";
import { ToastContainer } from "react-toastify";
import ContactFunction from "./ContactFunction";

const Contact = () => {
  const {
    handleChange,
    handleClickGithub,
    handleClickMail,
    handleClickLinkedin,
    handleSubmit,
    userFeedback,
    isLoading,
    formData,
  } = ContactFunction();

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
                <ClipLoader />
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
