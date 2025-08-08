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
  ShoppingCart,
} from "@mui/icons-material";

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

  const featuredPromotions = mockPromotions.filter((p) => p.featured);
  const regularPromotions = mockPromotions.filter((p) => !p.featured);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Promotions & Deals
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Discover amazing offers and save big on your favorite products
        </Typography>
      </Box>

      {/* Featured Promotions */}
      {featuredPromotions.length > 0 && (
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
            Featured Offers
          </Typography>
          <Grid container spacing={3}>
            {featuredPromotions.map((promotion) => (
              <Grid item xs={12} key={promotion.id}>
                <Card
                  sx={{
                    position: "relative",
                    overflow: "visible",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      transition: "transform 0.3s ease-in-out",
                      boxShadow: 4,
                    },
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <CardMedia
                      component="img"
                      height="250"
                      image={promotion.image}
                      alt={promotion.title}
                    />
                    <Chip
                      label="FEATURED"
                      color="error"
                      sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        fontWeight: "bold",
                      }}
                    />
                    <Chip
                      icon={<Timer />}
                      label={`${getDaysRemaining(promotion.endDate)} days left`}
                      color="warning"
                      sx={{
                        position: "absolute",
                        top: 16,
                        left: 16,
                      }}
                    />
                  </Box>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Chip
                        label={promotion.category}
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{ mr: 1 }}
                      />
                      <Chip
                        icon={<LocalOffer />}
                        label={`${promotion.discount} OFF`}
                        color="success"
                        sx={{ fontWeight: "bold" }}
                      />
                    </Box>

                    <Typography variant="h5" component="h3" gutterBottom>
                      {promotion.title}
                    </Typography>

                    <Typography
                      variant="body1"
                      color="text.secondary"
                      paragraph
                    >
                      {promotion.description}
                    </Typography>

                    {promotion.originalPrice > 0 && (
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <Typography
                          variant="h6"
                          color="primary"
                          sx={{ fontWeight: "bold", mr: 2 }}
                        >
                          ${promotion.discountedPrice}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          sx={{ textDecoration: "line-through" }}
                        >
                          ${promotion.originalPrice}
                        </Typography>
                      </Box>
                    )}

                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<ShoppingCart />}
                      onClick={() => handleShopNow(promotion.id)}
                      sx={{ mt: 2 }}
                    >
                      Shop Now
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Regular Promotions */}
      <Box>
        <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
          All Promotions
        </Typography>
        <Grid container spacing={3}>
          {regularPromotions.map((promotion) => (
            <Grid item xs={12} sm={6} md={4} key={promotion.id}>
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
                    image={promotion.image}
                    alt={promotion.title}
                  />
                  <Chip
                    icon={<Timer />}
                    label={`${getDaysRemaining(promotion.endDate)} days left`}
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
                  sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Chip
                      label={promotion.category}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      icon={<LocalOffer />}
                      label={`${promotion.discount} OFF`}
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
                    {promotion.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    paragraph
                    sx={{ flexGrow: 1 }}
                  >
                    {promotion.description}
                  </Typography>

                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<TrendingUp />}
                    onClick={() => handleShopNow(promotion.id)}
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
