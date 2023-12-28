import React from "react";

import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

import Router from "./Router";

const queryClient: QueryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <>
          <Toaster />
          <Router />
        </>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
