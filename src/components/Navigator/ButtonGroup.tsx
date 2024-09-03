import { NavigateFunction } from "react-router";
import { Explore, ExploreFill, Home, HomeFill, Search } from "../icons";

interface ButtonGroupProps {
  pathName: string;
  navigate: NavigateFunction;
}

const ButtonGroup = ({ pathName, navigate }: ButtonGroupProps) => {
  return (
    <>
      <a className="cursor-pointer" onClick={() => navigate("/home")}>
        {pathName === "home" ? (
          <HomeFill className="w-7 h-7 fill-primary" />
        ) : (
          <Home className="w-7 h-7 stroke-primary" />
        )}
      </a>
      <a className="cursor-pointer" onClick={() => navigate("/explore")}>
        {pathName === "explore" ? (
          <ExploreFill className="w-7 h-7 fill-primary" />
        ) : (
          <Explore className="w-7 h-7 stroke-primary" />
        )}
      </a>
      <button className="cursor-pointer" onClick={() => {}}>
        <Search className="w-7 h-7 stroke-primary" />
      </button>
    </>
  );
};

export default ButtonGroup;
