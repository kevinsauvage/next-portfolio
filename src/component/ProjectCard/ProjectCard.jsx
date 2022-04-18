import styles from "./ProjectCard.module.scss";
import SlideUpAndFadeIn from "../SlideUpAndFadeIn/SlideUpAndFadeIn";
import Image from "next/image";
import Link from "next/link";
import ProjectBtns from "../ProjectBtns/ProjectBtns";

const ProjectCard = ({ item }) => {
  return (
    <SlideUpAndFadeIn>
      <Link href={`/project/${item.title}`}>
        <a className={styles["ProjectCard"]}>
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
            <p className={styles["ProjectCard__languages"]}>{item.languages}</p>
          </div>
          <ProjectBtns item={item} />
        </a>
      </Link>
    </SlideUpAndFadeIn>
  );
};

export default ProjectCard;
