import React from "react";
import { ToggleButtonWrapper, ToggleHandle } from "./ToggleButton.styles";
import useToggle from "@/hooks/useToggle";

interface ToggleButtonProps {
  onFunc: () => void;
  offFunc: () => void;
  initToggleState?: boolean;
}

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

const ToggleButton: React.FC<ToggleButtonProps> = ({
  onFunc,
  offFunc,
  initToggleState = false,
}) => {
  const [isOn, toggler] = useToggle({
    onFunc,
    offFunc,
    initState: initToggleState,
  });

  return (
    <ToggleButtonWrapper $isOn={isOn} onClick={toggler}>
      <ToggleHandle layout transition={spring} />
    </ToggleButtonWrapper>
  );
};

export default ToggleButton;
