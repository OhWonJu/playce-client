import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

import AppContainer from "./AppContainer";
import reduxStore from "./stores/reduxStore";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 60 * 1000 } },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={reduxStore}>
        <AppContainer />
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
);
