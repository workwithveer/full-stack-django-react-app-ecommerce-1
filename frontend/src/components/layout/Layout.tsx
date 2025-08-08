import React from "react";
import { Container, CssBaseline } from "@mui/material";
import { Navigation } from "../navigation/Navigation";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Navigation />
      <Container maxWidth={false} sx={{ px: 2 }}>
        {children}
      </Container>
    </React.Fragment>
  );
};
