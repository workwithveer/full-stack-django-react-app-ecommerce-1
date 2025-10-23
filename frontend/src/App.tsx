import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";
import { theme } from "./theme/theme";
import { Layout } from "./components/layout/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Promotions from "./pages/Promotions";
import UserProfile from "./pages/UserProfile";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/promotions" element={<Promotions />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
