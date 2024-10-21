import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import GlobalStyles from "@/styles/GlobalStyles";
import "@/styles/tailwind.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalStyles />
  </StrictMode>,
);
