import * as React from "react";
import { SheetScrollerContextType, SheetContextType } from "./types";

export const SheetContext = React.createContext<SheetContextType | undefined>(
  undefined,
);

export const SubSheetContext = React.createContext<
  SheetContextType | undefined
>(undefined);

export const useSheetContext = (isMain: boolean) => {
  const context = isMain
    ? React.useContext(SheetContext)
    : React.useContext(SubSheetContext);
  // const context = React.useContext(SheetContext);

  if (!context) throw Error(`${isMain ? "Main" : "Sub"} Sheet context error`);

  return context;
};

export const SheetScrollerContext = React.createContext<
  SheetScrollerContextType | undefined
>(undefined);

export function SheetScrollerContextProvider({
  children,
  isMain,
}: {
  children: React.ReactNode;
  isMain: boolean;
}) {
  const sheetContext = useSheetContext(isMain);
  const [disableDrag, setDisableDrag] = React.useState(
    !!sheetContext.disableDrag,
  );

  function setDragEnabled() {
    if (!sheetContext.disableDrag) setDisableDrag(false);
  }

  function setDragDisabled() {
    if (!disableDrag) setDisableDrag(true);
  }

  return (
    <SheetScrollerContext.Provider
      value={{ disableDrag, setDragEnabled, setDragDisabled }}
    >
      {children}
    </SheetScrollerContext.Provider>
  );
}

export const useSheetScrollerContext = () => {
  const context = React.useContext(SheetScrollerContext);
  if (!context) throw Error("Sheet scroller context error");
  return context;
};
