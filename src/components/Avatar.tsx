import React from "react";

import { cn } from "@/lib/utils";
import { useModal } from "@/stores/useModalStore";
import { Profile } from "./icons";
import { useAuthStore } from "@/stores/useAuthStore";

interface AvatarProps {
  imageUrl?: string;
  size?: "sm" | "md" | "lg" | "xl" | "icon";
  className?: string;
  active?: boolean;
  onClick?: () => void;
}

const Avatar = ({
  imageUrl,
  onClick,
  size = "md",
  active = false,
  className,
}: AvatarProps) => {
  const { isLogin } = useAuthStore();
  const openModal = useModal(state => state.onOpen);

  return (
    <div
      className={cn(
        "rounded-full overflow-hidden p-[1.5px]",
        active && "bg-primary",
      )}
    >
      <i
        className={cn(
          "block rounded-full overflow-hidden",
          size === "sm" && "w-8 h-8",
          size === "md" && "w-10 h-10",
          size === "lg" && "w-14 h-14",
          size === "xl" && "w-40 h-40",
          size === "icon" && "w-7 h-7",
          className,
        )}
      >
        {isLogin && imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            width={"100%"}
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
            draggable={false}
            onClick={onClick}
          />
        ) : (
          <div
            role="button"
            className="w-full h-full bg-primary-foreground flex items-center justify-center"
            onClick={() => openModal("login")}
          >
            <Profile className="w-4 h-4 fill-secondary" />
          </div>
        )}
      </i>
    </div>
  );
};

export default React.memo(Avatar);
