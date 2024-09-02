import useViewModeStore from "@/stores/useViewMode";

import DesktopNavigator from "./DesktopNavigator";
import MobileNavigator from "./MobileNavigator";
import { useNavigate } from "react-router";
import useMeStore from "@/stores/useMeStore";

interface NavigatorProps {
  pathName: string;
}

const Navigator = ({ pathName }: NavigatorProps) => {
  const navigate = useNavigate();
  const { viewMode } = useViewModeStore();
  const { id, image } = useMeStore();

  if (viewMode === "INIT") return null;

  if (viewMode === "DESKTOP")
    return (
      <DesktopNavigator
        id={id}
        image={image}
        pathName={pathName}
        navigate={navigate}
      />
    );
  else
    return (
      <MobileNavigator
        id={id}
        image={image}
        pathName={pathName}
        navigate={navigate}
      />
    );
};

export default Navigator;
