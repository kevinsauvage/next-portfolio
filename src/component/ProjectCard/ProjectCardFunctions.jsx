import ReactGA from "react-ga4";
import getdateAndTime from "../../helpers/getDateAndTime";

const ProjectCardFunctions = (item) => {
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
  return { handleClickSourceCode, handleClickVisit };
};

export default ProjectCardFunctions;
