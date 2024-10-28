import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";

import AppContainer from "./AppContainer";
import ErrorFallback from "./errors/ErrorFallback";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 5 * 60 * 1000, throwOnError: true, retry: 1 },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          fallbackRender={fallbackProps => <ErrorFallback {...fallbackProps} />}
          onReset={reset} // reset 기능 연결
        >
          <QueryClientProvider client={queryClient}>
            <AppContainer />
          </QueryClientProvider>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  </StrictMode>,
);
