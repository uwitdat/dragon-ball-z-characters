import React, { useEffect, useState } from "react";
import { Link } from "@remix-run/react";
import DBZLOGO from "../../assets/dbz-logo.png";
import { AiOutlinePlusCircle } from "react-icons/ai";

const NavBar: React.FC = () => {
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        setIsScrolling(window.pageYOffset > 50)
      );
    }
  }, []);

  const navClass =
    "sticky top-0 px-5 bg-lav z-20 flex items-center justify-between border-b border-black border-opacity-10 nav-trans";
  const navClassHover = "border-opacity-0 nav-trans nav-hover";

  return (
    <nav
      className={isScrolling ? `${navClass} ${navClassHover}` : `${navClass}`}
    >
      <Link to="/">
        <img
          src={DBZLOGO}
          alt={"dragon ball z logo"}
          className="w-30 h-20 inline"
        />
      </Link>
      <Link to="/characters/new">
        <AiOutlinePlusCircle className="text-3xl text-dark cursor-pointer" />
      </Link>
    </nav>
  );
};

export default NavBar;
