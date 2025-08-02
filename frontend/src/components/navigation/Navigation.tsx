import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  Menu,
  MenuItem,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ShoppingCart as CartIcon,
  AccountCircle as AccountIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { useAuth } from "../../hooks/useAuth";
import { MobileDrawer } from "./MobileDrawer";
import { SearchBar } from "./SearchBar";

const navigationItems = [
  { label: "Home", path: "/" },
  { label: "Categories", path: "/categories" },
  { label: "Promotions", path: "/promotions" },
];

export const Navigation: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [cartItemCount, setCartItemCount] = useState(3); // Demo count
  const { user, logout } = useAuth();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
    // Implement search functionality
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const isMenuOpen = Boolean(anchorEl);

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My Orders</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position="sticky" color="default" elevation={1}>
        <Toolbar>
          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo/Brand */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: "none", sm: "block" },
              flexGrow: { xs: 0, sm: 0 },
              mr: 3,
              fontWeight: "bold",
              color: "primary.main",
            }}
          >
            E-Commerce Store
          </Typography>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 2 }}>
              {navigationItems.map((item) => (
                <Button
                  key={item.label}
                  color="inherit"
                  sx={{ textTransform: "none" }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Search Bar */}
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <SearchBar onSearch={handleSearch} />
          </Box>

          {/* Right Side Icons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Notifications */}
            <IconButton color="inherit">
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {/* Shopping Cart */}
            <IconButton color="inherit">
              <Badge badgeContent={cartItemCount} color="secondary">
                <CartIcon />
              </Badge>
            </IconButton>

            {/* User Account */}
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {user ? (
                <Avatar sx={{ width: 32, height: 32 }}>
                  {user.username.charAt(0).toUpperCase()}
                </Avatar>
              ) : (
                <AccountIcon />
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <MobileDrawer
        open={mobileOpen}
        onClose={handleDrawerToggle}
        user={user}
        onLogout={logout}
      />

      {/* User Menu */}
      {renderMenu}
    </>
  );
};
