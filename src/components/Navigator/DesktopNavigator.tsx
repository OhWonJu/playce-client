import { NavigateFunction } from "react-router";

import Avatar from "../Avatar";

import { ButtonGroup } from "./_modules";

import {
  DesktopNavigatorWrapper,
  NavButtonArea,
  ProfileArea,
} from "./desktopNavigator.styles";
import { useSidebar } from "@/stores/useSidebarStore";

interface DesktopNavigatorProps {
  id?: string;
  image?: string;
  pathName: string;
  navigate: NavigateFunction;
}

const DesktopNavigator = ({
  image,
  pathName,
  navigate,
}: DesktopNavigatorProps) => {
  const onOpen = useSidebar(state => state.onOpen);

  return (
    <DesktopNavigatorWrapper>
      <NavButtonArea>
        <ButtonGroup navigate={navigate} pathName={pathName} />
      </NavButtonArea>
      <ProfileArea>
        <Avatar
          imageUrl={image}
          size="icon"
          active={pathName === "cabinet"}
          className="cursor-pointer"
          // onClick={() => navigate(`/cabinet`)}
          onClick={() => onOpen("my")}
        />
      </ProfileArea>
    </DesktopNavigatorWrapper>
  );
};

export default DesktopNavigator;
