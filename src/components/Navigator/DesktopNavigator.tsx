import { NavigateFunction } from "react-router";

import { useSidebar } from "@/stores/useSidebarStore";

import Avatar from "../Avatar";

import { ButtonGroup } from "./_modules";

import {
  DesktopNavigatorWrapper,
  NavButtonArea,
  ProfileArea,
} from "./desktopNavigator.styles";

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
          onClick={() => onOpen("my")}
        />
      </ProfileArea>
    </DesktopNavigatorWrapper>
  );
};

export default DesktopNavigator;
