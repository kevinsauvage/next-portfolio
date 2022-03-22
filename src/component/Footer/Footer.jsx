/* eslint-disable @next/next/no-img-element */
import styles from "./Footer.module.scss";
import Section from "../../component/Section/Section";
import portrait from "../../images/portrait.png";

const Footer = () => {
  return (
    <Section>
      <footer className={styles["Footer"]}>
        <img className={styles["Footer__img"]} src={portrait.src} alt="portrait" />
        <p className={styles["Footer__name"]}>Kévin S.</p>
        <p className={styles["Footer__copyright"]}>
          © {new Date().getFullYear()}. All rights reserved.
        </p>
      </footer>
    </Section>
  );
};

export default Footer;
