import { NavigateFunction } from "react-router";

import {
  Explore,
  ExploreFill,
  Home,
  HomeFill,
  Search,
} from "@/components/icons";
import { Button } from "@/components/buttons";

interface ButtonGroupProps {
  pathName: string;
  navigate: NavigateFunction;
}

const ButtonGroup = ({ pathName, navigate }: ButtonGroupProps) => {
  return (
    <>
      <Button
        variant="plain"
        useRipple
        className="rounded-full h-full aspect-square"
        onClick={() => navigate("/home")}
        title="home"
      >
        <a>
          {pathName === "home" ? (
            <HomeFill className="w-7 h-7 fill-primary" />
          ) : (
            <Home className="w-7 h-7 stroke-primary" />
          )}
        </a>
      </Button>
      <Button
        variant="plain"
        useRipple
        className="rounded-full h-full aspect-square"
        onClick={() => navigate("/explore")}
        title="explore"
      >
        <a>
          {pathName === "explore" ? (
            <ExploreFill className="w-7 h-7 fill-primary" />
          ) : (
            <Explore className="w-7 h-7 stroke-primary" />
          )}
        </a>
      </Button>
      <Button
        variant="plain"
        useRipple
        className="rounded-full h-full aspect-square"
        title="search"
      >
        <a>
          <Search className="w-7 h-7 stroke-primary" />
        </a>
      </Button>
    </>
  );
};

export default ButtonGroup;
