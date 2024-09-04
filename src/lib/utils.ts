import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { SYMBOL_TITLE } from "@/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const TITLE_MAP: { [key: string]: string } = {
  "/login": "로그인",
  "/signup": "회원가입",
  "/profile": "User Profile",
};

export const getTitleFromRoute = (path: string): string => {
  if (TITLE_MAP[path]) {
    return `${TITLE_MAP[path]} | ${SYMBOL_TITLE}`;
  }

  const userProfileRegex = /^\/profile\/(\S+)$/;
  const albumsRegex = /^\/albums\/(\S+)$/;
  const myRegex = /^\/(my\/)(playlists)|(albums)|(queue)$/;

  let title = "";

  if (userProfileRegex.test(path)) {
    const userName = path.split("/").pop();
    title += `${userName} | `;
    // return `${userName} | ${SYMBOL_TITLE}`;
  } else if (albumsRegex.test(path)) {
    const albumName = path.split("/").pop();
    title += `${albumName} | `;
    // return `앨범 | ${SYMBOL_TITLE}`;
  } else if (myRegex.test(path)) {
    const endPoint = path.split("/").pop();

    switch (endPoint) {
      case "playlists":
        title += "나의 플레이리스트 | ";
        break;
      case "albums":
        title += "나의 앨범 | ";
        break;
      case "queue":
        title += "나의 큐 | ";
        break;
    }
  }

  return (title += `${SYMBOL_TITLE}`);
};

export const getExpiresAt = () => {
  return document.cookie
    .match("(^|;)\\s*playce_expires_at\\s*=\\s*([^;]+)")
    ?.pop();
};

export const convertTime = (time: number, mode: "number" | "string") => {
  const min = Math.floor(time / 60);
  const sec = Math.floor(time - min * 60);

  if (mode === "number") {
    return [min, sec];
  } else return `${min}:${sec.toString().padStart(2, "0")}`;
};
