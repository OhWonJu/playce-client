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
      >
        <a aria-label="to-home">
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
      >
        <a varia-label="to-explore">
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
      >
        <a varia-label="open-search">
          <Search className="w-7 h-7 stroke-primary" />
        </a>
      </Button>
    </>
  );
};

export default ButtonGroup;
