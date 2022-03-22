import styles from "./ProjectCard.module.scss";
import { AiOutlineGithub } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";
import SlideUpAndFadeIn from "../SlideUpAndFadeIn/SlideUpAndFadeIn";
import ReactGA from "react-ga";
import getdateAndTime from "../../helpers/getDateAndTime";
import Image from "next/image";

const ProjectCard = ({ item }) => {
  const handleClickSourceCode = () => {
    ReactGA.event({
      category: "Links",
      action: `GitHub project click : ${item.title} the ${getdateAndTime().date} at time ${
        getdateAndTime().time
      } `,
      label: "GitHub button clicked!",
    });
    window.open(item.githubLink);
  };

  const handleClickVisit = () => {
    ReactGA.event({
      category: "Links",
      action: `Visit: ${item.title}, the ${getdateAndTime().date} at time : ${
        getdateAndTime().time
      }`,
      label: "Project website opening",
    });
    window.open(item.websiteLink);
  };

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
        <p className={styles["ProjectCard__languages"]}>{item.languages}</p>
      </div>
      <div className={styles["ProjectCard__hover"]}>
        <div>
          <AiOutlineGithub onClick={() => handleClickSourceCode()} />
          Source code
        </div>
        <div>
          <FiExternalLink onClick={() => handleClickVisit()} />
          Visit website
        </div>
      </div>
    </SlideUpAndFadeIn>
  );
};

export default ProjectCard;
