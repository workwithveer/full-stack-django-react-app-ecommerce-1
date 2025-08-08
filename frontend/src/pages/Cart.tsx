import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  TextField,
  Divider,
  Container,
  Alert,
} from "@mui/material";
import {
  Add,
  Remove,
  Delete,
  ShoppingCart,
  ArrowBack,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  removeFromCart,
  updateQuantity,
  type CartItem,
} from "../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart: React.FC = () => {
  // const [cartItems, setCartItems] = useState(mockCartItems);
  const cartItems: CartItem[] | [] = useAppSelector(
    (state) => state.cart.items || []
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // const updateQuantityHandler = (itemId: number, newQuantity: number) => {
  //   if (newQuantity < 1) return;

  //   dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));
  // };

  // const removeItem = (itemId: number) => {
  //   dispatch(removeFromCart(itemId));
  // };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // calcaulte tax 13% of the subtotal
  const calculateTax = () => {
    return cartItems.reduce((total, item) => {
      const tax = item.price * 0.13 * item.quantity;
      return total + tax;
    }, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout...");
    // TODO: Implement checkout functionality
  };

  const handleContinueShopping = () => {
    console.log("Continue shopping...");
    navigate("/products");
  };

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ marginTop: 10 }}>
        <Box sx={{ textAlign: "center", py: 8 }}>
          <ShoppingCart sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
          <Typography variant="h5" component="h1" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Looks like you haven't added any items to your cart yet.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleContinueShopping}
            startIcon={<ArrowBack />}
          >
            Continue Shopping
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ marginTop: 5 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Shopping Cart
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Review your items and proceed to checkout
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Cart Items */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Cart Items ({cartItems.length})
              </Typography>

              {cartItems.map((item, index) => (
                <Box key={item.id}>
                  <Box sx={{ display: "flex", alignItems: "center", py: 2 }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 80, height: 80, mr: 2, borderRadius: 1 }}
                      image={item.imageUrl}
                      alt={item.name}
                    />

                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" component="h3">
                        {item.name}
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mt: 1 }}
                      >
                        <Typography
                          variant="h6"
                          color="primary"
                          sx={{ fontWeight: "bold" }}
                        >
                          ${item.price}
                        </Typography>
                        {item.price && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ textDecoration: "line-through", ml: 1 }}
                          >
                            ${item.price}
                          </Typography>
                        )}
                      </Box>
                      {!item.inStock && (
                        <Alert severity="warning" sx={{ mt: 1 }}>
                          This item is currently out of stock
                        </Alert>
                      )}
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: item.quantity - 1,
                            })
                          )
                        }
                        disabled={!item.inStock}
                      >
                        <Remove />
                      </IconButton>
                      <TextField
                        size="small"
                        value={item.quantity}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (!isNaN(value)) {
                            dispatch(
                              updateQuantity({ id: item.id, quantity: value })
                            );
                          }
                        }}
                        sx={{ width: 60 }}
                        disabled={!item.inStock}
                      />
                      <IconButton
                        size="small"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: item.quantity + 1,
                            })
                          )
                        }
                        disabled={!item.inStock}
                      >
                        <Add />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>
                  {index < cartItems.length - 1 && <Divider />}
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>

              <Box sx={{ my: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography>Subtotal:</Typography>
                  <Typography>${calculateSubtotal().toFixed(2)}</Typography>
                </Box>
                {calculateTax() > 0 && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography color="success.main">Tax:</Typography>
                    <Typography color="success.main">
                      +${calculateTax().toFixed(2)}
                    </Typography>
                  </Box>
                )}
                <Divider sx={{ my: 1 }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    Total:
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    ${calculateTotal().toFixed(2)}
                  </Typography>
                </Box>
              </Box>

              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={handleCheckout}
                disabled={cartItems.some((item) => !item.inStock)}
                sx={{ mb: 2 }}
              >
                Proceed to Checkout
              </Button>

              <Button
                variant="outlined"
                size="large"
                fullWidth
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
