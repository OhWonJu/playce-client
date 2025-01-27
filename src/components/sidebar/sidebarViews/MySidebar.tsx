import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { logOutMutate } from "@/api/users";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useSidebar } from "@/stores/useSidebarStore";
import useMeStore from "@/stores/useMeStore";
import { useModal } from "@/stores/useModalStore";
import { useCartStore } from "@/stores/useCartStore";

import Avatar from "@/components/Avatar";
import { Moon, Sun } from "@/components/icons";
import { Button, ToggleButton } from "@/components/buttons";
import { useThemeStore } from "@/components/providers/ThemeProvider";

import SidebarLayout from "../SidebarLayout";

const MySidebar = () => {
  const theme = useThemeStore(state => state.theme);
  const toggleTheme = useThemeStore(state => state.toggleTheme);
  const [_, setExpiredAt] = useLocalStorage("playce_expired_at");

  const navigate = useNavigate();

  const isOpen = useSidebar(state => state.isOpen);
  const onClose = useSidebar(state => state.onClose);

  const onOpen = useModal(state => state.onOpen);

  const { image, nickName } = useMeStore();
  const { totalItems } = useCartStore();

  const { mutate: logOut, isPending } = useMutation({
    mutationFn: async () => await logOutMutate(),
    onSuccess: () => {
      navigate("/");
      navigate(0);
      setExpiredAt("");
    },
  });

  const cartClickHandler = () => {
    onClose();
    setTimeout(() => onOpen("cart"), 10);
  };

  const bodyContent = (
    <div className="w-full flex flex-col space-y-4">
      <div className="w-full flex flex-row space-x-3">
        <Avatar imageUrl={image} size="md" />
        <div className="flex flex-col justify-center">
          <span className="">
            <strong>{nickName}</strong> 님
          </span>
          <span className="text-xs">PLAYCE에 오신 것을 환영해요!</span>
        </div>
      </div>
      <hr />

      <div className="flex flex-col space-y-2">
        {/* <Button
          variant="plain"
          onClick={() => navigate("/cabinet")}
          className="justify-start hover:bg-neutral-200 hover:dark:bg-neutral-700"
        >
          <span className="pt-1">나의 캐비닛</span>
        </Button> */}
        <Button
          variant="plain"
          onClick={() => navigate("/cabinet/albums")}
          className="justify-start hover:bg-accent"
        >
          <span>나의 앨범</span>
        </Button>
        <Button
          variant="plain"
          onClick={() => navigate("/cabinet/queue")}
          className="justify-start hover:bg-accent"
        >
          <span>나의 큐</span>
        </Button>
        <Button
          variant="plain"
          onClick={() => navigate("/cabinet/playlists")}
          className="justify-start hover:bg-accent"
        >
          <span>나의 플레이리스트</span>
        </Button>
      </div>
      <hr />

      <Button
        variant="plain"
        onClick={cartClickHandler}
        className="justify-start items-center gap-x-2 hover:bg-accent"
      >
        <span>나의 장바구니 </span>
        <span className="text-xs text-primary-foreground">{totalItems}개</span>
      </Button>
      <hr />

      <div className="flex flex-row items-center justify-between mx-4 transition-colors">
        <span className="text-sm">화면 모드</span>
        <div className="flex flex-row items-center justify-end space-x-2">
          {theme === "dark" ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
          <ToggleButton
            onFunc={() => toggleTheme()}
            offFunc={() => toggleTheme()}
            initToggleState={theme === "light" ? false : true}
          />
        </div>
      </div>
    </div>
  );

  const footerContent = (
    <div className="flex flex-col w-full space-y-4">
      <Button variant="outline" onClick={logOut} disabled={isPending}>
        <span>로그아웃</span>
      </Button>
      <Button
        variant="plain"
        onClick={() => onOpen("deleteUser")}
        className="bg-neutral-300 dark:bg-neutral-700 hover:bg-red-500 dark:hover:bg-red-500 text-neutral-50 dark:text-neutral-400 hover:text-white dark:hover:text-white"
      >
        <span>탈퇴</span>
      </Button>
    </div>
  );

  return (
    <SidebarLayout
      title=""
      align="right"
      isOpen={isOpen}
      onClose={onClose}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default MySidebar;
