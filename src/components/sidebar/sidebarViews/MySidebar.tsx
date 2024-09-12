import { useSidebar } from "@/stores/useSidebarStore";
import React from "react";
import SidebarLayout from "../SidebarLayout";
import Avatar from "@/components/Avatar";
import useMeStore from "@/stores/useMeStore";
import { useNavigate } from "react-router";
import { Button } from "@/components/buttons";

const MySidebar = () => {
  const onClose = useSidebar(state => state.onClose);
  const navigate = useNavigate();
  const { image, nickName } = useMeStore();

  const bodyContent = (
    <div className="w-full flex flex-col space-y-4">
      <div className="w-full flex flex-row space-x-2">
        <Avatar imageUrl={image} size="md" />
        <div className="flex flex-col justify-center">
          <span className="text-xs">PLAYCE에 오신것을 환영해요</span>
          <span className="">
            <strong>{nickName}</strong> 님
          </span>
        </div>
      </div>
      <hr />
      <div className="flex flex-col space-y-2">
        <Button
          variant="plain"
          className="hover:bg-neutral-100 dark:bg-neutral-700"
          onClick={() => navigate("/cabinet")}
        >
          나의 케비닛
        </Button>
        <Button
          variant="plain"
          className="hover:bg-neutral-100 dark:bg-neutral-700"
        >
          나의 장바구니
        </Button>
      </div>
    </div>
  );

  return (
    <SidebarLayout
      title="TEST"
      align="right"
      onClose={() => onClose()}
      body={bodyContent}
    />
  );
};

export default MySidebar;
