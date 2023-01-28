import React from "react";
import Image from "next/image";
import styles from "./ProjectSection.module.scss";
import GradientBorder from "../GradientBorder/GradientBorder";
import SlideUpAndFadeIn from "../SlideUpAndFadeIn/SlideUpAndFadeIn";

export default function ProjectSection({ image, title, description, direction }) {
  return (
    <SlideUpAndFadeIn>
      <section
        className={`${styles.ProjectSection} ${direction === "row-reverse" ? styles.ProjectSectionReverce : ""}`}
      >
        <div className={styles.imageContainer}>
          <Image
            src={image}
            layout='responsive'
            width={1482}
            height={867}
            alt={title}
            objectPosition={direction === "row" ? "right" : "left"}
          />
        </div>
        <div className={`${styles.detail} ${direction === "row-reverse" ? styles.detailReverse : ""}`}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>
      </section>
    </SlideUpAndFadeIn>
  );
}
