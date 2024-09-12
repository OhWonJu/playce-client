import React from "react";
import SymbolHeader from "../SymbolHeader";
import { SYMBOL_TITLE } from "@/constants";

const InitialLoader = () => {
  return (
    <div className="flex flex-col flex-1 h-full w-full sm:w-[420px] mx-auto justify-center items-center">
      <SymbolHeader title={SYMBOL_TITLE} />
    </div>
  );
};

export default InitialLoader;
