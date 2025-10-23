import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App.tsx";
import { store } from "./store";
import { theme } from "./theme/theme.ts";
import "./index.css";

// Start MSW worker in development
if (process.env.NODE_ENV !== "development") {
  // Import MSW worker
  const { worker } = await import("./mocks/browser");
  worker.start();
  // worker.start({
  //   onUnhandledRequest: "bypass", // Don't log unhandled requests
  // });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
