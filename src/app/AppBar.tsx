import { FC } from "react";
import ContentsHamburger from "@/app/ContentsHamburger";

const AppBar: FC = () => {
  return (
    <nav className="navbar">
      <div className="container d-flex flex-row justify-content-start">
        <ContentsHamburger />
        <span className="navbar-brand">React Bootstrap Data Grid</span>
      </div>
    </nav>
  );
};

export default AppBar;
