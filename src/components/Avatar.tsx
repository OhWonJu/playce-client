import { cn } from "@/lib/utils";
import React from "react";

interface AvatarProps {
  imageUrl?: string;
  size?: "sm" | "md" | "lg" | "icon";
  onClick?: () => void;
}

const Avatar = ({ imageUrl, onClick, size = "md" }: AvatarProps) => {
  return (
    <div
      className={cn(
        "rounded-full overflow-hidden",
        size === "sm" && "w-8 h-8",
        size === "md" && "w-10 h-10",
        size === "lg" && "w-14 h-14",
        size === "icon" && "w-7 h-7",
      )}
    >
      <img
        src={imageUrl}
        alt="avatar"
        style={{ objectFit: "cover" }}
        draggable={false}
        onClick={onClick}
      />
    </div>
  );
};

export default Avatar;
