import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Rating,
  CircularProgress,
  Alert,
  Paper,
  Button,
  Snackbar,
} from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import { useGetAllProductsQuery } from "../store/api/productsApi";
import { useAppDispatch } from "../store/hooks";
import { addToCart } from "../store/slices/cartSlice";
import Categories from "./Categories";
import type { Category } from "../models/category";

const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [addedProductName, setAddedProductName] = useState("");

  const dispatch = useAppDispatch();

  // Fetch products and categories
  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
  } = useGetAllProductsQuery(undefined, { refetchOnMountOrArgChange: true });

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? productsData?.filter(
        (product) => product.category.id === selectedCategory.id
      )
    : productsData;

  const handleCategorySelect = (category: Category | null) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = (product: any) => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        imageUrl: product.imageUrl || "https://placehold.co/50x50/EEE/31343C",
        quantity: 1,
        inStock: product.is_active,
      })
    );

    setAddedProductName(product.name);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  console.log("productsData", productsData);

  console.log("filteredProducts", filteredProducts);

  if (productsLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (productsError) {
    return (
      <Box sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 4 }}>
          Error loading products. Please try again later.
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 10 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Products
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Discover our amazing collection of products
        </Typography>
      </Box>

      {/* Main content with sidebar and products grid */}
      <Box sx={{ display: "flex", gap: 3 }}>
        {/* Categories Sidebar - 25% width */}
        <Box sx={{ width: "25%", minWidth: 250 }}>
          <Paper
            sx={{ p: 2, height: "fit-content", position: "sticky", top: 20 }}
          >
            <Categories
              selectedCategory={selectedCategory}
              onCategorySelect={handleCategorySelect}
            />
          </Paper>
        </Box>

        {/* Products Grid - 75% width */}
        <Box sx={{ width: "75%", flexGrow: 1 }}>
          {filteredProducts && filteredProducts.length > 0 ? (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(2, 1fr)",
                  lg: "repeat(3, 1fr)",
                  xl: "repeat(4, 1fr)",
                },
                gap: 3,
              }}
            >
              {filteredProducts &&
                filteredProducts.length > 0 &&
                filteredProducts.map((product) => (
                  <Card
                    key={product.id}
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "transform 0.2s ease-in-out",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 3,
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={
                        product.imageUrl ||
                        "https://placehold.co/300x200/EEE/31343C"
                      }
                      alt={product.name}
                      sx={{ objectFit: "cover" }}
                    />
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Box sx={{ mb: 1 }}>
                        <Chip
                          label={product.category.name}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      </Box>

                      <Typography
                        gutterBottom
                        variant="h6"
                        component="h2"
                        sx={{ flexGrow: 1 }}
                      >
                        {product.name}
                      </Typography>

                      {product.rating && (
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 1 }}
                        >
                          <Rating
                            value={product.rating}
                            precision={0.1}
                            readOnly
                            size="small"
                          />
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ ml: 1 }}
                          >
                            ({product.reviewCount || 0})
                          </Typography>
                        </Box>
                      )}

                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <Typography
                          variant="h6"
                          color="primary"
                          sx={{ fontWeight: "bold" }}
                        >
                          ${product.price}
                        </Typography>
                      </Box>

                      {/* Add to Cart Button */}
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddShoppingCart />}
                        onClick={() => handleAddToCart(product)}
                        sx={{
                          mt: "auto",
                          width: "100%",
                          py: 1,
                          "&:hover": {
                            transform: "scale(1.02)",
                          },
                        }}
                      >
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </Box>
          ) : (
            <Alert severity="info">
              {selectedCategory
                ? `No products found in ${selectedCategory.name}. Try selecting a different category.`
                : "No products found. Try adjusting your search or filter criteria."}
            </Alert>
          )}
        </Box>
      </Box>

      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={`${addedProductName} added to cart!`}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
    </Box>
  );
};

export default Products;
