import { useNavigate } from "react-router-dom";

import useViewModeStore from "@/stores/useViewMode";
import useMeStore from "@/stores/useMeStore";

import DesktopNavigator from "./DesktopNavigator";
import MobileNavigator from "./MobileNavigator";

interface NavigatorProps {
  pathName: string;
}

const Navigator = ({ pathName }: NavigatorProps) => {
  const navigate = useNavigate();
  const viewMode = useViewModeStore(state => state.viewMode);
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
