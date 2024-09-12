import { useSidebar } from "@/stores/useSidebarStore";
import React from "react";
import SidebarLayout from "../SidebarLayout";

const MySidebar = () => {
  const onClose = useSidebar(state => state.onClose);

  const bodyContent = <div>TEST</div>;

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
