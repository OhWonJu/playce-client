import { useEffect } from "react";

import { MOBILE_LIMIT, TABLET_LIMIT } from "@/constants/uiSizes";

import useViewModeStore from "@/stores/useViewMode";
import useWindowSize from "@/hooks/useWindowSize";

const ViewModeProvider = () => {
  const { width } = useWindowSize();
  const { viewMode, setViewMode } = useViewModeStore();

  useEffect(() => {
    if (!width) {
      // setViewMode("INIT");
      return;
    }

    if (width < MOBILE_LIMIT && viewMode !== "MOBILE") {
      setViewMode("MOBILE");
    } else if (
      width >= MOBILE_LIMIT &&
      width < TABLET_LIMIT &&
      viewMode !== "TABLET"
    ) {
      setViewMode("TABLET");
    } else if (width >= TABLET_LIMIT && viewMode !== "DESKTOP") {
      setViewMode("DESKTOP");
    }
  }, [width]);

  return null;
};

export default ViewModeProvider;
