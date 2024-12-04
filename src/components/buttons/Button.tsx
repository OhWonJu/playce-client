import {
  forwardRef,
  ButtonHTMLAttributes,
  useRef,
  MouseEvent,
  useCallback,
} from "react";
import { mergeRefs } from "react-merge-refs";

import { cn } from "@/lib/utils";

import { RippleEffect } from "../RippleEffect";
import LoadingDots from "../LoadingDots/LoadingDots";

import { Flat, Plain, Ghost, Link, Outline, Disabled } from "./Button.styles";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
  variant?: "flat" | "plain" | "ghost" | "outline" | "link" | "disabled";
  active?: boolean;
  type?: "submit" | "reset" | "button";
  children: any;
  width?: string | number;
  size?: "default" | "sm" | "lg" | "icon";
  loading?: boolean;
  disabled?: boolean;
  useRipple?: boolean;
  rippleColor?: string;
  onClick?: () => void;
}

const ButtonType = {
  flat: Flat,
  plain: Plain,
  ghost: Ghost,
  outline: Outline,
  link: Link,
  disabled: Disabled,
};

const Button = forwardRef((props: ButtonProps, buttonRef) => {
  const {
    className,
    variant = "outline",
    active,
    width,
    loading = false,
    disabled = false,
    style = {},
    children,
    size = "default",
    type = "button",
    useRipple,
    rippleColor,
    onClick,
    ...rest
  } = props;

  const ButtonWrapper = ButtonType[loading || disabled ? "disabled" : variant];
  const ref = useRef<typeof ButtonWrapper>(null);
  const rippleRef = useRef(null);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      event.preventDefault();

      rippleRef.current.createRipple(event);
      onClick?.();
    },
    [rippleRef.current, onClick],
  );

  return (
    <ButtonWrapper
      aria-pressed={active}
      data-variant={variant}
      ref={mergeRefs([ref, buttonRef])}
      className={cn(
        "relative overflow-hidden inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-0 transition-colors focus-visible:outline-none focus-visible:ring-0 disabled:pointer-events-none",
        size === "default" && "h-10 px-4 py-2",
        size === "sm" && "h-9 px-3",
        size === "lg" && "h-[54px] rounded-md px-8 text-base",
        size === "icon" && "h-10 w-10 rounded-full",
        className,
      )}
      disabled={disabled || loading}
      style={{
        width,
        ...style,
      }}
      type={type}
      onClick={useRipple ? handleClick : onClick}
      {...rest}
    >
      {loading ? (
        <i>
          <LoadingDots />
        </i>
      ) : (
        <>{children}</>
      )}
      {useRipple && !loading && !disabled && <RippleEffect ref={rippleRef} />}
    </ButtonWrapper>
  );
});

export default Button;
