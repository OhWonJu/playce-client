import { NavigateFunction } from "react-router";

import { Explore, ExploreFill, Home, HomeFill, Search } from "@/components/icons";

interface ButtonGroupProps {
  pathName: string;
  navigate: NavigateFunction;
}

const ButtonGroup = ({ pathName, navigate }: ButtonGroupProps) => {
  return (
    <>
      <a
        aria-label="to-home"
        onClick={() => navigate("/home")}
        className="cursor-pointer"
      >
        {pathName === "home" ? (
          <HomeFill className="w-7 h-7 fill-primary" />
        ) : (
          <Home className="w-7 h-7 stroke-primary" />
        )}
      </a>
      <a
        varia-label="to-explore"
        onClick={() => navigate("/explore")}
        className="cursor-pointer"
      >
        {pathName === "explore" ? (
          <ExploreFill className="w-7 h-7 fill-primary" />
        ) : (
          <Explore className="w-7 h-7 stroke-primary" />
        )}
      </a>
      <button aria-label="search" onClick={() => {}} className="cursor-pointer">
        <Search className="w-7 h-7 stroke-primary" />
      </button>
    </>
  );
};

export default ButtonGroup;
