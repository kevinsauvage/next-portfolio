import styles from "./Header.module.scss";
import Image from "next/image";
import { RiMenu4Fill } from "react-icons/ri";
import { IoMdCloseCircle } from "react-icons/io";
import Link from "next/link";
import portrait from "../../images/portrait.png";
import GradientBorder from "../GradientBorder/GradientBorder";
import HeaderFunction from "./HeaderFunction";
import ToggleTheme from "../ToggleTheme/ToggleTheme";

const Header = () => {
  const { links, scrolled, setMenuIsOpen, menuIsOpen, handleDowloadCv } = HeaderFunction();

  return (
    <div className={`${styles["Header"]} ${scrolled ? styles["Header--scrolled"] : ""}`}>
      <div className={styles["Header__logo"]}>
        <Link href="/" passHref>
          <a>
            <GradientBorder radius="50%">
              <Image
                className={styles["Header__logo-img"]}
                src={portrait.src}
                alt="profil"
                width={60}
                height={60}
              />
            </GradientBorder>
          </a>
        </Link>
        <p className={styles["Header__logo-name"]}>Kévin S.</p>
      </div>
      <nav className={`${styles["Header__nav"]} ${menuIsOpen ? styles["Header__nav--open"] : ""}`}>
        <ul className={styles["Header__nav-list"]}>
          {links.map((link, i) => (
            <li
              key={i}
              className={`${styles["Header__nav-item"]} ${
                menuIsOpen ? styles["Header__nav-item--open"] : ""
              }`}>
              <Link href={`/${link.hash}`} onClick={() => link.to()}>
                {link.text}
              </Link>
            </li>
          ))}
          <li
            className={`${styles["Header__nav-item"]} ${
              menuIsOpen ? styles["Header__nav-item--open"] : ""
            }`}>
            <ToggleTheme />
          </li>
          <li
            className={`${styles["Header__nav-item"]} ${
              menuIsOpen ? styles["Header__nav-item--open"] : ""
            }`}>
            <GradientBorder radius="8px">
              <button
                onClick={() => handleDowloadCv()}
                className={`${styles["Header__nav-cv"]} ${
                  menuIsOpen ? styles["Header__nav-cv--open"] : ""
                }`}>
                CV
              </button>
            </GradientBorder>
          </li>
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
