import styles from "./Section.module.scss";

const Section = ({ children, className, id }) => {
  return (
    <section id={id} className={`${styles["Section"]} ${className ? className : ""}`}>
      {children}
    </section>
  );
};

export default Section;
