import { lazy, Suspense, useEffect } from "react";
import { NavigateFunction } from "react-router";
import { useMotionValue, animate } from "framer-motion";

import { NAV_HEIGHT } from "@/constants/uiSizes";

import { usePlayerToggle } from "@/stores/usePlayerToggleStore";
import useViewModeStore from "@/stores/useViewMode";
import MainSheetProgressStore from "@/stores/mainSheetProgress";
import SubSheetProgressStore from "@/stores/subSheetProgress";
import { useSidebar } from "@/stores/useSidebarStore";

import Avatar from "../Avatar";

import { ButtonGroup } from "./_modules";

import {
  MobileNavigatorWrapper,
  NavButtonArea,
} from "./mobileNavigator.styles";

import { DEFAULT_TWEEN_CONFIG } from "../BottomSheet/constants";

const PlayIndicator = lazy(() => import("./_modules/PlayIndicator"));

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
  const onOpen = useSidebar(state => state.onOpen);

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
      <Suspense>
        {displayPlayer && progress < 1 ? <PlayIndicator /> : null}
      </Suspense>
      <NavButtonArea>
        <ButtonGroup navigate={navigate} pathName={pathName} />
        <Avatar
          imageUrl={image}
          size="icon"
          active={pathName === "cabinet"}
          className="cursor-pointer"
          onClick={() => onOpen("my")}
        />
      </NavButtonArea>
    </MobileNavigatorWrapper>
  );
};

export default MobileNavigator;
