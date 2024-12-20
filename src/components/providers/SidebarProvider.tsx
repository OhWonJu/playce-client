import { useSidebar } from "@/stores/useSidebarStore";
import React, { lazy, Suspense } from "react";

const MySidebar = lazy(
  () => import("@/components/sidebar/sidebarViews/MySidebar"),
);

const SidebarProvider = () => {
  const type = useSidebar(state => state.type);

  return <Suspense>{type === "my" && <MySidebar />}</Suspense>;
};

export default SidebarProvider;
