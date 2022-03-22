import styles from "./Footer.module.scss";
import Section from "../../component/Section/Section";
import portrait from "../../images/portrait.png";
import Image from "next/image";

const Footer = () => {
  return (
    <Section>
      <footer className={styles["Footer"]}>
        <Image
          className={styles["Footer__img"]}
          src={portrait.src}
          alt="portrait"
          width={60}
          height={60}
        />
        <p className={styles["Footer__name"]}>Kévin S.</p>
        <p className={styles["Footer__copyright"]}>
          © {new Date().getFullYear()}. All rights reserved.
        </p>
      </footer>
    </Section>
  );
};

export default Footer;
