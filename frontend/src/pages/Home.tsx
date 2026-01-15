import React from "react";
import {
  Box,
  Typography,
  Grid,
  CardContent,
  Button,
  CardActionArea,
} from "@mui/material";
import {
  ShoppingCart,
  Category,
  LocalOffer,
  Person,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  console.log("Home");
  const features = [
    {
      title: "Browse Products",
      description:
        "Explore our wide range of products across different categories",
      icon: Category,
      color: "#1976d2",
      path: "/products",
    },
    {
      title: "Shopping Cart",
      description: "Add items to cart and manage your shopping experience",
      icon: ShoppingCart,
      color: "#dc004e",
      path: "/cart",
    },
    {
      title: "Promotions",
      description: "Discover amazing deals and discounts on selected products",
      icon: LocalOffer,
      color: "#2e7d32",
      path: "/promotions",
    },
    {
      title: "User Profile",
      description: "Manage your account, view orders, and update preferences",
      icon: Person,
      color: "#ed6c02",
      path: "/profile",
    },
  ];

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  return (
    <Box sx={{ textAlign: "center", mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome to Our E-Commerce Store
      </Typography>
      <Typography variant="h6" color="text.secondary" paragraph>
        Discover amazing products with great deals and excellent service
      </Typography>

      <Grid container spacing={3}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index} component="div">
            <CardActionArea
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                "&:hover": {
                  transform: "translateY(-4px)",
                  transition: "transform 0.3s ease-in-out",
                  boxShadow: 3,
                },
              }}
              onClick={() => handleCardClick(feature.path)}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                <Box sx={{ mb: 2 }}>
                  <feature.icon sx={{ fontSize: 48, color: feature.color }} />
                </Box>
                <Typography gutterBottom variant="h6" component="h2">
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Button
          variant="contained"
          size="large"
          sx={{ mr: 2 }}
          onClick={() => navigate("/products")}
        >
          Start Shopping
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate("/promotions")}
        >
          View Promotions
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
