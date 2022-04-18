/* eslint-disable react/no-unescaped-entities */
import styles from "./Banner.module.scss";
import portrait from "../../images/banner_home.png";
import SlideUpAndFadeIn from "../../component/SlideUpAndFadeIn/SlideUpAndFadeIn";
import Image from "next/image";

const Banner = () => {
  return (
    <section className={styles["Banner"]}>
      <main className={styles["Banner__main"]}>
        <SlideUpAndFadeIn>
          <p className={styles["Banner__main-header"]}>Hi, my name is</p>
          <h1 className={styles["Banner__main-title"]}>Kévin Sauvage.</h1>
          <h2 className={styles["Banner__main-title-b"]}> I'm a developer.</h2>
          <p className={styles["Banner__main-subtitle"]}>
            I create intuitive, dynamic user experiences that are responsive, load blazing fast, and
            are crafted with pixel-perfect code.
          </p>
        </SlideUpAndFadeIn>
      </main>
      <aside className={styles["Banner__aside"]}>
        <SlideUpAndFadeIn>
          <Image
            width="851"
            height="741"
            layout="responsive"
            src={portrait.src}
            alt="illustrtion"
          />
        </SlideUpAndFadeIn>
      </aside>
    </section>
  );
};

export default Banner;
