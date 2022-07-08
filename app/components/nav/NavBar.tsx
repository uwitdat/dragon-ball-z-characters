import { Link } from "@remix-run/react";
import DBZLOGO from "../../assets/dbzlogo.png";
import { AiOutlinePlusCircle } from "react-icons/ai";

const NavBar = () => {
  return (
    <nav className="sticky top-0 px-5 bg-blue-900 z-20 flex items-center justify-between">
      <Link to="/">
        <img
          src={DBZLOGO}
          alt={"dragon ball z logo"}
          className="w-20 h-20 inline"
        />
      </Link>
      <Link to="/characters/new">
        <AiOutlinePlusCircle className="text-3xl text-white cursor-pointer" />
      </Link>
    </nav>
  );
};

export default NavBar;
