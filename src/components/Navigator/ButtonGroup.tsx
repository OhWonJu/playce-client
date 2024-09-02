import { NavigateFunction } from "react-router";
import { Explore, ExploreFill, Home, HomeFill, Search } from "../icons";

interface ButtonGroupProps {
  pathName: string;
  navigate: NavigateFunction;
}

const ButtonGroup = ({ pathName, navigate }: ButtonGroupProps) => {
  return (
    <>
      <a onClick={() => navigate("/home")}>
        {pathName === "home" ? (
          <HomeFill className="w-7 h-7 fill-primary" />
        ) : (
          <Home className="w-7 h-7" />
        )}
      </a>
      <a onClick={() => navigate("/explore")}>
        {pathName === "explore" ? (
          <ExploreFill className="w-7 h-7 fill-primary" />
        ) : (
          <Explore className="w-7 h-7" />
        )}
      </a>
      <button onClick={() => {}}>
        <Search className="w-7 h-7" />
      </button>
    </>
  );
};

export default ButtonGroup;
