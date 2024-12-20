import React, {
  ElementRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocation } from "react-router";
import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";

import { cn } from "@/lib/utils";

import useViewModeStore from "@/stores/useViewMode";

import { ChevronLeft, ChevronRight } from "../icons";

import {
  SidebarContent,
  SidebarContainer,
  SidebarFooter,
  SidebarHeader,
} from "./sidebar.styles";
import { useOutsideClick } from "@/hooks/useOutsideClick";

interface SidebarLayoutProps {
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  disabled?: boolean;
  resizeable?: boolean;
  isOpen: boolean;
  onClose: () => void;
  containerClassName?: string;
  align?: "left" | "right";
}

const DURATION = 300;

const SidebarLayout = ({
  body,
  footer,
  title,
  disabled,
  isOpen,
  onClose,
  resizeable = true,
  containerClassName,
  align = "left",
}: SidebarLayoutProps) => {
  const location = useLocation();
  const viewMode = useViewModeStore(state => state.viewMode);

  const [showSidebar, setShowSidebar] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const isResizeingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const currentPath = useRef(location.pathname);

  const collapse = () => {
    if (sidebarRef.current) {
      setIsResetting(true);

      sidebarRef.current.style.width = "0";

      setTimeout(() => setIsResetting(false), DURATION);
    }
  };

  const handleClose = useCallback(() => {
    if (disabled) return;

    collapse();
    setShowSidebar(false);
    setTimeout(() => onClose(), DURATION);
  }, [disabled, onClose]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        return handleClose();
      }
    },
    [onClose],
  );

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (!resizeable) return;
    if (viewMode === "MOBILE") return;

    isResizeingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizeingRef.current) return;
    if (!resizeable) return;
    if (viewMode === "MOBILE") return;

    let newWidth =
      align === "left" ? event.clientX : event.view.innerWidth - event.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 300) newWidth = 300;

    if (sidebarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
    }
  };

  const handleMouseUp = () => {
    if (!resizeable) return;
    if (viewMode === "MOBILE") return;

    isResizeingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current) {
      setIsResetting(true);

      sidebarRef.current.style.width = viewMode === "MOBILE" ? "100%" : "300px";

      setTimeout(() => setIsResetting(false), DURATION);
    }
  };

  useOutsideClick(showSidebar, sidebarRef, handleClose);

  useEffect(() => {
    setShowSidebar(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const sidebar = sidebarRef.current;

    if (sidebar) {
      disableBodyScroll(sidebar, { reserveScrollBarGap: false });
      window.addEventListener("keydown", handleKey);
    }
    return () => {
      clearAllBodyScrollLocks();
      window.removeEventListener("keydown", handleKey);
    };
  }, [handleKey]);

  useEffect(() => {
    resetWidth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMode]);

  useEffect(() => {
    if (currentPath.current !== location.pathname) handleClose();
  }, [currentPath.current, location.pathname]);

  if (!isOpen) return null;

  return (
    <SidebarContainer
      ref={sidebarRef}
      className={cn(
        "duration-300 transform-gpu",
        showSidebar ? "opacity-100" : "opacity-0",
        align === "left" ? "left-0" : "right-0",
        showSidebar && align === "left" && "translate-x-0",
        !showSidebar && align === "left" && "-translate-x-full",
        showSidebar && align === "right" && "translate-x-0",
        !showSidebar && align === "right" && "translate-x-full",
        isResetting && "transition-all ease-in-out duration-300",
        containerClassName,
      )}
      $viewMode={viewMode}
      $align={align}
    >
      <SidebarHeader>
        <span className="text-lg font-semibold">{title}</span>
        <button
          onClick={handleClose}
          className={cn(
            "absolute p-1 border-0 hover:opacity-70 transition",
            align === "left" && "left-4",
            align === "right" && "right-4",
          )}
        >
          {align === "left" ? (
            <ChevronLeft className="w-6 h-6" strokeWidth={2} />
          ) : (
            <ChevronRight className="w-6 h-6" strokeWidth={2} />
          )}
        </button>
      </SidebarHeader>

      <SidebarContent>
        {body}
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className={cn(
            "opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 top-0",
            align === "left" && "right-0",
            align === "right" && "left-0",
          )}
        />
      </SidebarContent>

      <SidebarFooter>{footer}</SidebarFooter>
    </SidebarContainer>
  );
};

export default SidebarLayout;
