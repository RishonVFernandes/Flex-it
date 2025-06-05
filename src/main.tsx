import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";

import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { SidebarProvider } from "./context/SidebarContext.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    // <StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    {/* <SidebarProvider> */}
                    <App />
                    {/* </SidebarProvider> */}
                </Provider>
            </QueryClientProvider>
        </BrowserRouter>
    // </StrictMode>
);
