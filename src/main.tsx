import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/tailwind.css";

import App from "./App";
import GlobalStyles from "./styles/GlobalStyles";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalStyles />
    <App />
  </StrictMode>
);
