import React from "react";
import { Container, CssBaseline } from "@mui/material";
import { Navigation } from "../navigation/Navigation";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
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
