import { NavigateFunction } from "react-router";

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
  return (
    <DesktopNavigatorWrapper>
      <NavButtonArea>
        <ButtonGroup navigate={navigate} pathName={pathName} />
      </NavButtonArea>
      <ProfileArea>
        <Avatar
          imageUrl={image}
          size="icon"
          active={pathName === "my"}
          className="cursor-pointer"
          onClick={() => navigate(`/my`)}
        />
      </ProfileArea>
    </DesktopNavigatorWrapper>
  );
};

export default DesktopNavigator;
