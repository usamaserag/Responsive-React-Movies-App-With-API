import React, { useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import "./styles.scss";

const Header = () => {
  const headerNavBar = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Movies",
      path: "/movie",
    },
    {
      name: "TV Series",
      path: "/tv",
    },
  ];

  const { pathname } = useLocation();
  const headerRef = useRef(null);
  const active = headerNavBar.findIndex((e) => e.path === pathname);

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };
    window.addEventListener("scroll", shrinkHeader);
    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);

  return (
    <div ref={headerRef} className="header__wrap container">
      <div className="logo">
        <Link to="/">Movies</Link>
      </div>
      <ul className="header__nav">
        {headerNavBar.map((item, index) => {
          return (
            <li key={index} className={`${index === active && "active"}`}>
              <Link to={item.path}>{item.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Header;
