import { AiOutlineGithub } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";
import GradientBorder from "../GradientBorder/GradientBorder";
import styles from "./ProjectBtns.module.scss";
import ReactGA from "react-ga4";

export default function ProjectBtns({ item }) {
  const handleClickSourceCode = (e) => {
    e.stopPropagation();

    ReactGA.event({
      category: "Links",
      action: `GitHub project click : ${item.title}`,
    });
    item.githubLink.forEach((element) => {
      window.open(element);
    });
  };

  const handleClickVisit = (e) => {
    e.stopPropagation();

    ReactGA.event({
      category: "Links",
      action: `Visit: ${item.title}`,
    });
    window.open(item.websiteLink);
  };

  return (
    <div className={styles.ProjectBtns}>
      <GradientBorder radius="10px">
        <button
          onClick={handleClickSourceCode}
          type="button"
          className={styles.btn + " " + styles.btnGit}>
          <AiOutlineGithub />
          <p>Source code</p>
        </button>
      </GradientBorder>
      <button
        onClick={handleClickVisit}
        type="button"
        className={styles.btn + "  " + styles.btnLink}>
        <FiExternalLink />
        <p>Visit website</p>
      </button>
    </div>
  );
}
