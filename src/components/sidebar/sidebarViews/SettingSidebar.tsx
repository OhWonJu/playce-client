import React from "react";
import SidebarLayout from "../SidebarLayout";
import { useSidebar } from "@/stores/useSidebarStore";

const SettingSidebar = () => {
  const onClose = useSidebar(state => state.onClose);

  const bodyContent = <div>TEST</div>;

  return (
    <SidebarLayout
      title="TEST"
      align="left"
      onClose={() => onClose()}
      body={bodyContent}
    />
  );
};

export default SettingSidebar;
