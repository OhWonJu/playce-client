import React from "react";

import { cn } from "@/lib/utils";

interface AvatarProps {
  imageUrl?: string;
  size?: "sm" | "md" | "lg" | "icon";
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
          size === "icon" && "w-7 h-7",
          className,
        )}
      >
        <img
          src={imageUrl}
          alt="avatar"
          style={{ objectFit: "cover" }}
          draggable={false}
          onClick={onClick}
        />
      </i>
    </div>
  );
};

export default React.memo(Avatar);
