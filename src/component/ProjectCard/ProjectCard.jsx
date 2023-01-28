import styles from "./ProjectCard.module.scss";
import SlideUpAndFadeIn from "../SlideUpAndFadeIn/SlideUpAndFadeIn";
import Image from "next/image";
import ProjectBtns from "../ProjectBtns/ProjectBtns";
import { useRouter } from "next/router";

const ProjectCard = ({ item }) => {
  const router = useRouter();
  return (
    <SlideUpAndFadeIn>
      <div className={styles["ProjectCard"]} onClick={() => router.push(`/project/${item.title}`)}>
        <div className={styles["ProjectCard__images"]}>
          <Image src={item.img.laptop} alt={item.title} width='800' height='344' layout='responsive' />
        </div>
        <div className={styles["ProjectCard__detail"]}>
          <p className={styles["ProjectCard__title"]}>{item.title}</p>
          <p className={styles["ProjectCard__description"]}>{item.description}</p>
          <p className={styles["ProjectCard__languages"]}>{item.languages}</p>
        </div>
        <ProjectBtns item={item} />
      </div>
    </SlideUpAndFadeIn>
  );
};

export default ProjectCard;
