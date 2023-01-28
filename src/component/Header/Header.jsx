import styles from "./Header.module.scss";
import Image from "next/image";
import { RiMenu4Fill } from "react-icons/ri";
import { IoMdCloseCircle } from "react-icons/io";
import Link from "next/link";
import portrait from "../../images/portrait.png";
import GradientBorder from "../../component/GradientBorder/GradientBorder";
import HeaderFunction from "./HeaderFunction";
import Container from "../../component/Container/Container";

const Header = () => {
  const { links, scrolled, setMenuIsOpen, menuIsOpen } = HeaderFunction();

  return (
    <div className={`${styles["Header"]} ${scrolled ? styles["Header--scrolled"] : ""}`}>
      <Container classname={styles.container}>
        <div className={styles["Header__logo"]}>
          <Link href='/' passHref>
            <a>
              <GradientBorder radius='50%'>
                <Image className={styles["Header__logo-img"]} src={portrait.src} alt='profile' width={60} height={60} />
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
                className={`${styles["Header__nav-item"]} ${menuIsOpen ? styles["Header__nav-item--open"] : ""}`}
              >
                <Link href={`/${link.hash}`} onClick={() => link.to()}>
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
          <IoMdCloseCircle className={styles["Header__close"]} onClick={() => setMenuIsOpen((prev) => !prev)} />
        </nav>
        <RiMenu4Fill className={styles["Header__hamb"]} onClick={() => setMenuIsOpen((prev) => !prev)} />
      </Container>
    </div>
  );
};

export default Header;
