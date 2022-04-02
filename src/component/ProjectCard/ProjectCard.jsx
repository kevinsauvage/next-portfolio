import styles from "./ProjectCard.module.scss";
import { AiOutlineGithub } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";
import SlideUpAndFadeIn from "../SlideUpAndFadeIn/SlideUpAndFadeIn";
import Image from "next/image";
import ProjectCardFunctions from "./ProjectCardFunctions";
import GradientBorder from "../GradientBorder/GradientBorder";

const ProjectCard = ({ item }) => {
  const { handleClickSourceCode, handleClickVisit } = ProjectCardFunctions(item);

  return (
    <SlideUpAndFadeIn className={styles["ProjectCard"]}>
      <div className={styles["ProjectCard__images"]}>
        <Image
          src={item.img.laptop}
          alt={item.title}
          width="800"
          height="344"
          layout="responsive"
        />
      </div>
      <div className={styles["ProjectCard__detail"]}>
        <p className={styles["ProjectCard__title"]}>{item.title}</p>
        <p className={styles["ProjectCard__description"]}>{item.description}</p>
        {item.testAccount && (
          <p>
            Test credentials: Email = {item.testAccount.email} Password ={" "}
            {item.testAccount.password}
          </p>
        )}
        <p className={styles["ProjectCard__languages"]}>{item.languages}</p>
      </div>
      <div className={styles["ProjectCard__btns"]}>
        <GradientBorder radius="10px">
          <button
            onClick={() => handleClickSourceCode()}
            className={styles["ProjectCard__btn"] + " " + styles["ProjectCard__btn-git"]}>
            <AiOutlineGithub />
            <p>Source code</p>
          </button>
        </GradientBorder>
        <button
          onClick={() => handleClickVisit()}
          className={styles["ProjectCard__btn"] + "  " + styles["ProjectCard__btn-link"]}>
          <FiExternalLink />
          <p>Visit website</p>
        </button>
      </div>
    </SlideUpAndFadeIn>
  );
};

export default ProjectCard;
