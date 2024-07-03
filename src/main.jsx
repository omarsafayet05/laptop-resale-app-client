import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes.jsx";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./Providers/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalProvider } from "styled-react-modal";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <HelmetProvider>
            <div className="max-w-screen-lg mx-auto">
              <RouterProvider router={router}>
                <App />
              </RouterProvider>
            </div>
          </HelmetProvider>
        </ModalProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
