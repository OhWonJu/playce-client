import { NavigateFunction } from "react-router";
import { useMotionValue, motion, animate } from "framer-motion";

import { usePlayerToggle } from "@/stores/usePlayerToggleStore";
import MainSheetProgressStore from "@/stores/mainSheetProgress";

import Avatar from "../Avatar";

import { ButtonGroup, PlayIndicator } from "./_modules";

import {
  MobileNavigatorWrapper,
  NavButtonArea,
} from "./mobileNavigator.styles";
import { NAV_HEIGHT } from "@/constants/uiSizes";
import useViewModeStore from "@/stores/useViewMode";
import SubSheetProgressStore from "@/stores/subSheetProgress";
import { useEffect } from "react";
import { DEFAULT_TWEEN_CONFIG } from "../BottomSheet/constants";

interface MobileNavigatorProps {
  id?: string;
  image?: string;
  pathName: string;
  navigate: NavigateFunction;
}

const MobileNavigator = ({
  image,
  pathName,
  navigate,
}: MobileNavigatorProps) => {
  const { viewMode } = useViewModeStore();
  const { displayPlayer } = usePlayerToggle();
  const { progress } = MainSheetProgressStore();
  const { progress: subProgress } = SubSheetProgressStore();

  const y = useMotionValue(0);

  useEffect(() => {
    if (viewMode === "DESKTOP") return;

    if (subProgress > 0) {
      y.get() < NAV_HEIGHT && y.set(NAV_HEIGHT);
      return;
    }

    if (progress <= 0) {
      animate(y, 0, { type: "tween", ...DEFAULT_TWEEN_CONFIG } as {
        type: "tween";
      });
    } else {
      animate(y, (progress / 100) * NAV_HEIGHT, {
        type: "tween",
        ...DEFAULT_TWEEN_CONFIG,
      } as { type: "tween" });
    }
  }, [progress]);

  return (
    <MobileNavigatorWrapper
      style={{
        y,
      }}
      initial={progress <= 0 ? { y: 0 } : false}
    >
      {displayPlayer && progress < 1 ? <PlayIndicator /> : null}
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
