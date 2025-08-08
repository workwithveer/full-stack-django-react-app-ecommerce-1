import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
} from "@mui/material";
import {
  Home as HomeIcon,
  Category as CategoryIcon,
  LocalOffer as PromotionsIcon,
  ShoppingCart as CartIcon,
  Person as ProfileIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import type { NavigationItem, User } from "../../types/navigation";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
  onLogout: () => void;
  onNavigation: (path: string) => void;
  currentPath: string;
}

const navigationItems: NavigationItem[] = [
  { id: "home", label: "Home", path: "/", icon: HomeIcon },
  {
    id: "products",
    label: "Products",
    path: "/products",
    icon: CategoryIcon,
  },
  {
    id: "promotions",
    label: "Promotions",
    path: "/promotions",
    icon: PromotionsIcon,
  },
];

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  open,
  onClose,
  user,
  onLogout,
  onNavigation,
  currentPath,
}) => {
  const handleNavigation = (path: string) => {
    onNavigation(path);
    onClose();
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      <Box sx={{ width: 250 }}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => handleNavigation("/")}
          >
            E-Commerce Store
          </Typography>
        </Box>

        <List>
          {navigationItems.map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                selected={currentPath === item.path}
                sx={{
                  backgroundColor:
                    currentPath === item.path
                      ? "rgba(25, 118, 210, 0.08)"
                      : "transparent",
                  "&.Mui-selected": {
                    backgroundColor: "rgba(25, 118, 210, 0.12)",
                    "&:hover": {
                      backgroundColor: "rgba(25, 118, 210, 0.16)",
                    },
                  },
                }}
              >
                <ListItemIcon>{item.icon && <item.icon />}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavigation("/cart")}>
              <ListItemIcon>
                <CartIcon />
              </ListItemIcon>
              <ListItemText primary="Shopping Cart" />
            </ListItemButton>
          </ListItem>

          {user ? (
            <>
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleNavigation("/profile")}>
                  <ListItemIcon>
                    <ProfileIcon />
                  </ListItemIcon>
                  <ListItemText primary={`Welcome, ${user.username}`} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={onLogout}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            </>
          ) : (
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Box>
    </Drawer>
  );
};
