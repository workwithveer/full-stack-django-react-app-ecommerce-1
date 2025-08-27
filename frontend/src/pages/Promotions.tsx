import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Container,
  Alert,
} from "@mui/material";
import {
  LocalOffer,
  Timer,
  TrendingUp,
} from "@mui/icons-material";
import { useGetProductPromotionEventsQuery } from "../store/api/promotionsApi";

// Mock promotional data - in a real app, this would come from an API
const mockPromotions = [
  {
    id: 1,
    title: "Summer Sale - Up to 50% Off",
    description:
      "Get amazing discounts on electronics, fashion, and home goods. Limited time offer!",
    discount: "50%",
    originalPrice: 299.99,
    discountedPrice: 149.99,
    image: "https://via.placeholder.com/400x250?text=Summer+Sale",
    category: "Electronics",
    endDate: "2024-08-31",
    isActive: true,
    featured: true,
  },
  {
    id: 2,
    title: "Flash Sale - 24 Hours Only",
    description:
      "Hurry! This flash sale ends in 24 hours. Don't miss out on these incredible deals.",
    discount: "30%",
    originalPrice: 199.99,
    discountedPrice: 139.99,
    image: "https://via.placeholder.com/400x250?text=Flash+Sale",
    category: "Fashion",
    endDate: "2024-07-15",
    isActive: true,
    featured: false,
  },
  {
    id: 3,
    title: "New Customer Discount",
    description:
      "First-time customers get an additional 10% off their first purchase. Use code: NEW10",
    discount: "10%",
    originalPrice: 0,
    discountedPrice: 0,
    image: "https://via.placeholder.com/400x250?text=New+Customer",
    category: "All Categories",
    endDate: "2024-12-31",
    isActive: true,
    featured: false,
  },
  {
    id: 4,
    title: "Bulk Purchase Discount",
    description:
      "Buy 3 or more items and get 15% off your entire order. Perfect for gift shopping!",
    discount: "15%",
    originalPrice: 0,
    discountedPrice: 0,
    image: "https://via.placeholder.com/400x250?text=Bulk+Discount",
    category: "All Categories",
    endDate: "2024-09-30",
    isActive: true,
    featured: false,
  },
];

const Promotions: React.FC = () => {
  const {
    data: productPromotions,
    isLoading,
    error,
  } = useGetProductPromotionEventsQuery();
  console.log("productPromotions", productPromotions);
  console.log("isLoading", isLoading);
  console.log("error", error);

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleShopNow = (promotionId: number) => {
    console.log(`Shop now for promotion ${promotionId}`);
    // TODO: Navigate to products page with promotion filter
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Promotions & Deals
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Discover amazing offers and save big on your favorite products
        </Typography>
      </Box>

      {/* Regular Promotions */}
      <Box>
        <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
          All Promotions
        </Typography>
        <Grid container spacing={3}>
          {productPromotions &&
            productPromotions.map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.id}>
                <Card
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
                >
                  <Box sx={{ position: "relative" }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image="https://placehold.co/250x200/EEE/31343C"
                      alt={item.product.name}
                    />
                    <Chip
                      icon={<Timer />}
                      label={`${getDaysRemaining(
                        item.promotion.endDate
                      )} days left`}
                      color="warning"
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                      }}
                    />
                  </Box>
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Chip
                        label={item.product.category.name}
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{ mr: 1 }}
                      />
                      <Chip
                        icon={<LocalOffer />}
                        label={`${item.promotion.price_reduction} OFF`}
                        color="success"
                        size="small"
                        sx={{ fontWeight: "bold" }}
                      />
                    </Box>

                    <Typography
                      variant="h6"
                      component="h3"
                      gutterBottom
                      sx={{ flexGrow: 1 }}
                    >
                      {item.product.name}
                    </Typography>

                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<TrendingUp />}
                      onClick={() => handleShopNow(item.promotion.id)}
                      sx={{ mt: "auto" }}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>

      {/* No Promotions Alert */}
      {mockPromotions.length === 0 && (
        <Alert severity="info" sx={{ mt: 4 }}>
          No active promotions at the moment. Check back soon for amazing deals!
        </Alert>
      )}
    </Container>
  );
};

export default Promotions;
