import React, {
  forwardRef,
  MouseEvent,
  useImperativeHandle,
  useRef,
} from "react";

import rippleStyle from "./RippleEffect.module.css";

interface RippleEffectProps {
  rippleColor?: string;
}

export type RippleRef = {
  createRipple: (event: MouseEvent<HTMLElement>) => void;
};

const RippleEffect = forwardRef(({ rippleColor }: RippleEffectProps, ref) => {
  const rippleContainerRef = useRef<HTMLSpanElement>(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        createRipple(event: MouseEvent<HTMLElement>) {
          const button = event.currentTarget;
          const circle = document.createElement("i");
          const diameter = Math.max(button.clientWidth, button.clientHeight);
          const radius = diameter / 2;

          circle.style.width = `${diameter}px`;
          circle.style.height = `${diameter}px`;
          circle.style.left = `${
            event.clientX - button.getBoundingClientRect().left - radius
          }px`;
          circle.style.top = `${
            event.clientY - button.getBoundingClientRect().top - radius
          }px`;
          circle.style.backgroundColor = rippleColor
            ? rippleColor
            : "var(--puls)";

          circle.classList.add(rippleStyle.ripple);

          const existingRipple = button.querySelector(`.${rippleStyle.ripple}`);

          if (existingRipple) {
            existingRipple.remove();
          }

          rippleContainerRef.current?.appendChild(circle);
        },
      };
    },
    [rippleContainerRef],
  );

  return <span ref={rippleContainerRef} className="ripple bg-red-200" />;
});

export default RippleEffect;
