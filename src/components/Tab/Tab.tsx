import React from "react";
import { motion } from "framer-motion";

import { Tab, TabText, Tabs } from "./Tab.styles";
import { cn } from "@/lib/utils";
import Button from "../buttons/Button";

interface TabComponentProps {
  tabContents: Array<string>;
  tabClickHandler: (index: number) => void;
  focusedTab: number;
  className?: string;
  style?: object;
}

const TabComponent = ({
  tabContents,
  tabClickHandler,
  focusedTab = -1,
  className,
  style,
}: TabComponentProps) => {
  return (
    <Tabs
      data-test="tabs"
      className={cn(
        "relative w-full h-full flex justify-between items-center",
        className,
      )}
      style={style}
    >
      {tabContents.map((item, index) => (
        <Tab key={index}>
          <Button
            useRipple
            variant="plain"
            className="w-full h-full rounded-none"
            onClick={() => tabClickHandler(index)}
          >
            <TabText $focused={index === focusedTab}>{item}</TabText>
          </Button>
          {index === focusedTab ? (
            <motion.span
              layoutId="tab-underline"
              className="underline"
              style={{ originY: "0px" }}
            />
          ) : null}
        </Tab>
      ))}
    </Tabs>
  );
};

export default TabComponent;
