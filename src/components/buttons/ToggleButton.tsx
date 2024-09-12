import React from "react";
import { ToggleButtonWrapper, ToggleHandle } from "./ToggleButton.styles";
import useToggle from "@/hooks/useToggle";
import { cn } from "@/lib/utils";

interface ToggleButtonProps {
  onFunc: () => void;
  offFunc: () => void;
  initToggleState?: boolean;
  className?: string;
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
  className,
}) => {
  const [isOn, toggler] = useToggle({
    onFunc,
    offFunc,
    initState: initToggleState,
  });

  return (
    <ToggleButtonWrapper
      $isOn={isOn}
      onClick={toggler}
      className={cn("w-14 h-8 p-1", className)}
    >
      <ToggleHandle layout transition={spring} className="h-full aspect-square"/>
    </ToggleButtonWrapper>
  );
};

export default ToggleButton;
