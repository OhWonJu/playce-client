import { useState } from "react";

interface useToggleProps {
  onFunc: Function;
  offFunc: Function;
  initState?: boolean;
}

const useToggle = ({
  onFunc,
  offFunc,
  initState = false,
}: useToggleProps): [boolean, Function] => {
  const [isOn, setIsOn] = useState(initState);

  const toggler = () => {
    const nextIsOn = !isOn;
    setIsOn(nextIsOn);

    if (nextIsOn) onFunc();
    else offFunc();
  };

  return [isOn, toggler];
};

export default useToggle;
