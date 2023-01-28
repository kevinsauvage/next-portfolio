import styles from "./Contact.module.scss";
import Section from "../../component/Section/Section";
import Title from "../../component/Title/Title";
import UpTitle from "../../component/UpTitle/UpTitle";
import { BiMailSend } from "react-icons/bi";
import { SiGmail } from "react-icons/si";
import { AiOutlineGithub } from "react-icons/ai";
import { ImLinkedin2 } from "react-icons/im";
import { ClipLoader } from "react-spinners";
import { MdLocationOn, MdMail } from "react-icons/md";
import SlideUpAndFadeIn from "../../component/SlideUpAndFadeIn/SlideUpAndFadeIn";
import { ToastContainer } from "react-toastify";
import ContactFunction from "./ContactFunction";
import Link from "next/link";

const Contact = () => {
  const { handleChange, handleSubmit, userFeedback, isLoading, formData } = ContactFunction();

  const socialBtn = [
    { href: "https://www.linkedin.com/in/kevin-sauvage/", icon: <ImLinkedin2 />, text: "Linkedin" },
    { href: "https://github.com/kevinsauvage/", icon: <AiOutlineGithub />, text: "Github" },
    { href: "mailto:kevinsauvage@outlook.com", icon: <SiGmail />, text: "E-mail" },
  ];

  return (
    <Section id='contact' className={styles["Contact"]}>
      <UpTitle text='SOMETHING TO SAY' />
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
            {socialBtn.map((item) => (
              <Link href={item.href} key={item.href}>
                <a className={styles["Contact__social-icon"]} target='_blank'>
                  {item.icon}
                  <span>{item.text}</span>
                </a>
              </Link>
            ))}
          </div>
        </SlideUpAndFadeIn>
        <SlideUpAndFadeIn className={styles["Contact__form-input-container"]}>
          <form action='submit' className={styles["Contact__form"]} onSubmit={handleSubmit} autoComplete='off'>
            <div className={styles["Contact__form-row"]}>
              <input
                className={styles["Contact__form-input"]}
                type='text'
                name='name'
                value={formData.name}
                placeholder='Name'
                onChange={handleChange}
              />
              <input
                className={styles["Contact__form-input"]}
                type='email'
                name='email'
                value={formData.email}
                placeholder='Email'
                onChange={handleChange}
              />
            </div>
            <input
              className={styles["Contact__form-input"]}
              type='text'
              name='subject'
              value={formData.subject}
              placeholder='Subject'
              onChange={handleChange}
            />
            <textarea
              className={styles["Contact__form-text-area"]}
              name='message'
              cols='30'
              rows='10'
              value={formData.message}
              placeholder='Message'
              onChange={handleChange}
            ></textarea>
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
          </form>
        </SlideUpAndFadeIn>
      </div>

      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
    </Section>
  );
};

export default Contact;
