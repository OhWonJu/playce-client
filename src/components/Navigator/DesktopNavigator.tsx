import {
  DesktopNavigatorWrapper,
  NavButtonArea,
  ProfileArea,
} from "./desktopNavigator.styles";
import { NavigateFunction } from "react-router";
import Avatar from "../Avatar";
import ButtonGroup from "./ButtonGroup";

interface DesktopNavigatorProps {
  id?: string;
  image?: string;
  pathName: string;
  navigate: NavigateFunction;
}

const DesktopNavigator = ({
  id,
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
          onClick={() => navigate(`/profile/${id}`)}
        />
      </ProfileArea>
    </DesktopNavigatorWrapper>
  );
};

export default DesktopNavigator;
