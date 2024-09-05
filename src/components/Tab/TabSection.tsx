import React from "react";
import { AnimatePresence, motion } from "framer-motion";

interface TabSectionComponentProps {
  focusedTab: number;
  prevFocusedTab: number;
  tabViews: JSX.Element[];
  className?: string;
  style?: object;
}

const TabSectionComponent: React.FC<TabSectionComponentProps> = ({
  focusedTab,
  prevFocusedTab,
  tabViews,
  // className,
  // style,
}) => {
  // const rootClassName = cn(
  //   "relative w-full h-full flex justify-between items-center",
  //   {},
  //   className,
  // );

  return (
    <AnimatePresence>
      <motion.div
        key={focusedTab ? focusedTab : -1}
        initial={{
          x: prevFocusedTab < focusedTab ? 10 : -10,
          opacity: 0,
        }}
        animate={{ x: 0, opacity: 1 }}
        // exit={{ x: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {focusedTab !== -1 ? tabViews[focusedTab] : null}
      </motion.div>
    </AnimatePresence>
  );
};

export default TabSectionComponent;
