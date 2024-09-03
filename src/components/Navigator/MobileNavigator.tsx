import { NavigateFunction } from "react-router";
import { useMotionValue } from "framer-motion";

import { usePlayerToggle } from "@/stores/usePlayerToggleStore";

import ButtonGroup from "./ButtonGroup";
import Avatar from "../Avatar";

import {
  MobileNavigatorWrapper,
  NavButtonArea,
} from "./mobileNavigator.styles";

interface MobileNavigatorProps {
  id?: string;
  image?: string;
  pathName: string;
  navigate: NavigateFunction;
}

const MobileNavigator = ({
  id,
  image,
  pathName,
  navigate,
}: MobileNavigatorProps) => {
  const { displayPlayer } = usePlayerToggle();

  const y = useMotionValue(0);

  return (
    <MobileNavigatorWrapper
      style={{
        y,
      }}
      // initial={progress <= 0 ? { y: 0 } : false}
    >
      {/* {displayPlayer && progress < 1 ? <PlayIndicator /> : null} */}
      <NavButtonArea>
        <ButtonGroup navigate={navigate} pathName={pathName} />
        <Avatar
          imageUrl={image}
          size="icon"
          className="cursor-pointer"
          active={pathName === "my"}
          onClick={() => navigate(`/my`)}
        />
      </NavButtonArea>
    </MobileNavigatorWrapper>
  );
};

export default MobileNavigator;
