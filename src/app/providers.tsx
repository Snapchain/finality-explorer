"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { ThemeProvider } from "next-themes";
import React from "react";

import { ErrorProvider } from "./context/Error/ErrorContext";
import { PrivacyProvider } from "./context/Privacy/PrivacyContext";
import { TermsProvider } from "./context/Terms/TermsContext";

function Providers({ children }: React.PropsWithChildren) {
  const [client] = React.useState(new QueryClient());

  return (
    <ThemeProvider defaultTheme="dark" attribute="data-theme">
      <QueryClientProvider client={client}>
        <TermsProvider>
          <PrivacyProvider>
            <ErrorProvider>
              <ReactQueryStreamedHydration>
                {children}
              </ReactQueryStreamedHydration>
            </ErrorProvider>
          </PrivacyProvider>
        </TermsProvider>
        <ReactQueryDevtools
          buttonPosition="bottom-left"
          initialIsOpen={false}
        />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default Providers;
