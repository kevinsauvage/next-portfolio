import { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { RiMenu4Fill } from "react-icons/ri";
import { IoMdCloseCircle } from "react-icons/io";
import portrait from "../../images/portrait.png";
import ReactGA from "react-ga";
import getdateAndTime from "../../helpers/getDateAndTime";
import Image from "next/image";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  useEffect(() => {
    const body = document.querySelector("body");
    if (menuIsOpen) body.style.overflow = "hidden";
    else body.style.overflow = "auto";
  }, [menuIsOpen]);

  const scrollOpation = { behavior: "smooth", block: "start", inline: "nearest" };

  const scrollToContact = () => {
    document.querySelector("#contact").scrollIntoView(scrollOpation);
    setMenuIsOpen(false);
  };

  const scrollToAbout = () => {
    document.querySelector("#about").scrollIntoView(scrollOpation);
    setMenuIsOpen(false);
  };

  const scrollToWhat = () => {
    document.querySelector("#what").scrollIntoView(scrollOpation);
    setMenuIsOpen(false);
  };

  const scrollToProjects = () => {
    document.querySelector("#projects").scrollIntoView(scrollOpation);
    setMenuIsOpen(false);
  };

  const scrollToTop = () => {
    document.querySelector("#app").scrollIntoView(scrollOpation);
    setMenuIsOpen(false);
  };

  const links = [
    { to: scrollToTop, text: "HOME" },
    { to: scrollToAbout, text: "ABOUT" },
    { to: scrollToWhat, text: "WHAT" },
    { to: scrollToProjects, text: "PROJECTS" },
    { to: scrollToContact, text: "CONTACT" },
  ];

  const listenToScroll = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    if (winScroll > 90) setScrolled(true);
    else setScrolled(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  const handleDowloadCv = () => {
    ReactGA.event({
      category: "CV",
      action: `CV download cicked, the ${getdateAndTime().date} at time: ${getdateAndTime().time}`,
    });
    window.open("/Kévin__sauvage__resume.pdf");
  };

  return (
    <div className={`${styles["Header"]} ${scrolled ? styles["Header--scrolled"] : ""}`}>
      <div className={styles["Header__logo"]}>
        <Image
          className={styles["Header__logo-img"]}
          src={portrait.src}
          alt="profil"
          width={60}
          height={60}
        />
        <p className={styles["Header__logo-name"]}>Kévin S.</p>
      </div>
      <nav className={`${styles["Header__nav"]} ${menuIsOpen ? styles["Header__nav--open"] : ""}`}>
        <ul className={styles["Header__nav-list"]}>
          {links.map((link, i) => (
            <li
              key={i}
              className={`${styles["Header__nav-item"]} ${
                menuIsOpen ? styles["Header__nav-item--open"] : ""
              }`}
              onClick={() => link.to()}>
              {link.text}
            </li>
          ))}
          <button
            onClick={() => handleDowloadCv()}
            className={`${styles["Header__nav-cv"]} ${
              menuIsOpen ? styles["Header__nav-cv--open"] : ""
            }`}>
            CV
          </button>
        </ul>
        <IoMdCloseCircle
          className={styles["Header__close"]}
          onClick={() => setMenuIsOpen((prev) => !prev)}
        />
      </nav>
      <RiMenu4Fill
        className={styles["Header__hamb"]}
        onClick={() => setMenuIsOpen((prev) => !prev)}
      />
    </div>
  );
};

export default Header;
