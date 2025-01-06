import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

import { cn } from "@/lib/utils";

import { Cross } from "@/components/icons";

import {
  ModalOverlay,
  ModalCotainer,
  ModalHeader,
  ModalContent,
  ModalFooter,
} from "./ModalLayout.styles";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useGobackBlocking } from "@/hooks/useGobackBlocking";

interface ModalLayoutProps {
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  disabled?: boolean;
  isOpen: boolean;
  onClose: () => void;
  containerClassName?: string;
  mode?: "slide" | "fade";
}

const ModalLayout = ({
  body,
  footer,
  title,
  disabled,
  isOpen,
  onClose,
  containerClassName,
  mode = "fade",
}: ModalLayoutProps) => {
  const location = useLocation();

  const [showModal, setShowModal] = useState(false);

  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
  const containerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const currentPath = useRef(location.pathname);

  const handleModalClose = useCallback(() => {
    if (disabled) return;

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300); // for animation
  }, [disabled, onClose]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        return handleModalClose();
      }
    },
    [onClose],
  );

  useOutsideClick(showModal, containerRef, handleModalClose);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const modal = ref.current;

    if (modal) {
      disableBodyScroll(modal, { reserveScrollBarGap: false });
      window.addEventListener("keydown", handleKey);
    }

    return () => {
      clearAllBodyScrollLocks();
      window.removeEventListener("keydown", handleKey);
    };
  }, [handleKey]);

  useEffect(() => {
    if (currentPath.current !== location.pathname) handleModalClose();
  }, [currentPath.current, location.pathname]);

  useGobackBlocking(handleModalClose);

  if (!isOpen) return null;

  return (
    <>
      <ModalOverlay ref={ref} role="dialog">
        <ModalCotainer
          ref={containerRef}
          className={cn(
            "duration-300 transform-gpu",
            showModal ? "opacity-100" : "opacity-0",
            showModal && mode === "slide" && "translate-y-0",
            !showModal && mode === "slide" && "translate-y-full",
            containerClassName,
          )}
        >
          <ModalHeader>
            <span className="text-lg font-semibold">{title}</span>
            <button
              onClick={handleModalClose}
              className="p-1 border-0 hover:opacity-70 transition absolute right-4"
            >
              <Cross className="w-6 h-6" strokeWidth={2} />
            </button>
          </ModalHeader>

          <ModalContent>{body}</ModalContent>

          <ModalFooter>{footer}</ModalFooter>
        </ModalCotainer>
      </ModalOverlay>
    </>
  );
};

export default ModalLayout;
