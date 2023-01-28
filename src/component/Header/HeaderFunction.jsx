import { Router } from "next/router";
import { useEffect, useState } from "react";
import ReactGA from "react-ga4";

const HeaderFunction = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  Router.events.on("hashChangeStart", () => {
    menuIsOpen && setMenuIsOpen(false);
  });

  useEffect(() => {
    const body = document.querySelector("body");
    if (menuIsOpen) body.style.overflow = "hidden";
    else body.style.overflow = "auto";
  }, [menuIsOpen]);

  const links = [
    { hash: "#app", text: "HOME" },
    { hash: "#about", text: "ABOUT" },
    { hash: "#skills", text: "SKILLS" },
    { hash: "#projects", text: "PROJECTS" },
    { hash: "#contact", text: "CONTACT" },
  ];

  const listenToScroll = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    if (winScroll > 50) setScrolled(true);
    else setScrolled(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  return { links, scrolled, setMenuIsOpen, menuIsOpen };
};

export default HeaderFunction;
