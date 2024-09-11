import { getTitleFromRoute } from "@/lib/utils";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router";

const HelmetHeader = () => {
  const location = useLocation();

  return (
    <Helmet>
      <title>{getTitleFromRoute(decodeURI(location.pathname))}</title>
    </Helmet>
  );
};

export default HelmetHeader;
