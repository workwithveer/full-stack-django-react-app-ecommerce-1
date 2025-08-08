// import React from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   CardMedia,
//   Button,
//   IconButton,
//   TextField,
//   Divider,
//   Container,
//   Alert,
// } from "@mui/material";
// import {
//   Add,
//   Remove,
//   Delete,
//   ShoppingCart as ShoppingCartIcon,
//   ArrowBack,
// } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "../store/hooks";
// import {
//   removeFromCart,
//   updateQuantity,
//   selectCartItems,
//   selectCartTotal,
// } from "../store/slices/cartSlice";

// const ShoppingCart: React.FC = () => {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const cartItems = useAppSelector(selectCartItems);
//   const cartTotal = useAppSelector(selectCartTotal);

//   const handleUpdateQuantity = (itemId: number, newQuantity: number) => {
//     if (newQuantity < 1) return;
//     dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));
//   };

//   const handleRemoveItem = (itemId: number) => {
//     dispatch(removeFromCart(itemId));
//   };

//   const handleCheckout = () => {
//     console.log("Proceeding to checkout...");
//     // TODO: Implement checkout functionality
//   };

//   const handleContinueShopping = () => {
//     navigate("/products");
//   };

//   if (cartItems.length === 0) {
//     return (
//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         <Box sx={{ textAlign: "center", py: 8 }}>
//           <ShoppingCartIcon
//             sx={{ fontSize: 64, color: "text.secondary", mb: 2 }}
//           />
//           <Typography variant="h5" component="h1" gutterBottom>
//             Your cart is empty
//           </Typography>
//           <Typography variant="body1" color="text.secondary" paragraph>
//             Looks like you haven't added any items to your cart yet.
//           </Typography>
//           <Button
//             variant="contained"
//             size="large"
//             onClick={handleContinueShopping}
//             startIcon={<ArrowBack />}
//           >
//             Continue Shopping
//           </Button>
//         </Box>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Box sx={{ mb: 4 }}>
//         <Typography variant="h4" component="h1" gutterBottom>
//           Shopping Cart
//         </Typography>
//         <Typography variant="body1" color="text.secondary">
//           Review your items and proceed to checkout
//         </Typography>
//       </Box>

//       <Grid container spacing={3}>
//         {/* Cart Items */}
//         <Grid item xs={12} md={8}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Cart Items ({cartItems.length})
//               </Typography>

//               {cartItems.map((item, index) => (
//                 <Box key={item.id}>
//                   <Box sx={{ display: "flex", alignItems: "center", py: 2 }}>
//                     <CardMedia
//                       component="img"
//                       sx={{ width: 80, height: 80, mr: 2, borderRadius: 1 }}
//                       image={item.image_url}
//                       alt={item.name}
//                     />

//                     <Box sx={{ flexGrow: 1 }}>
//                       <Typography variant="h6" component="h3">
//                         {item.name}
//                       </Typography>
//                       <Box
//                         sx={{ display: "flex", alignItems: "center", mt: 1 }}
//                       >
//                         <Typography
//                           variant="h6"
//                           color="primary"
//                           sx={{ fontWeight: "bold" }}
//                         >
//                           ${item.price}
//                         </Typography>
//                         {item.original_price &&
//                           item.original_price > item.price && (
//                             <Typography
//                               variant="body2"
//                               color="text.secondary"
//                               sx={{ textDecoration: "line-through", ml: 1 }}
//                             >
//                               ${item.original_price}
//                             </Typography>
//                           )}
//                       </Box>
//                       {!item.inStock && (
//                         <Alert severity="warning" sx={{ mt: 1 }}>
//                           This item is currently out of stock
//                         </Alert>
//                       )}
//                     </Box>

//                     <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                       <IconButton
//                         size="small"
//                         onClick={() =>
//                           handleUpdateQuantity(item.id, item.quantity - 1)
//                         }
//                         disabled={!item.inStock}
//                       >
//                         <Remove />
//                       </IconButton>
//                       <TextField
//                         size="small"
//                         value={item.quantity}
//                         onChange={(e) => {
//                           const value = parseInt(e.target.value);
//                           if (!isNaN(value)) {
//                             handleUpdateQuantity(item.id, value);
//                           }
//                         }}
//                         sx={{ width: 60 }}
//                         disabled={!item.inStock}
//                       />
//                       <IconButton
//                         size="small"
//                         onClick={() =>
//                           handleUpdateQuantity(item.id, item.quantity + 1)
//                         }
//                         disabled={!item.inStock}
//                       >
//                         <Add />
//                       </IconButton>
//                       <IconButton
//                         color="error"
//                         onClick={() => handleRemoveItem(item.id)}
//                       >
//                         <Delete />
//                       </IconButton>
//                     </Box>
//                   </Box>
//                   {index < cartItems.length - 1 && <Divider />}
//                 </Box>
//               ))}
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Order Summary */}
//         <Grid item xs={12} md={4}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Order Summary
//               </Typography>

//               <Box sx={{ my: 2 }}>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     mb: 1,
//                   }}
//                 >
//                   <Typography>Subtotal:</Typography>
//                   <Typography>${cartTotal.toFixed(2)}</Typography>
//                 </Box>
//                 <Divider sx={{ my: 1 }} />
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     mb: 2,
//                   }}
//                 >
//                   <Typography variant="h6" fontWeight="bold">
//                     Total:
//                   </Typography>
//                   <Typography variant="h6" fontWeight="bold" color="primary">
//                     ${cartTotal.toFixed(2)}
//                   </Typography>
//                 </Box>
//               </Box>

//               <Button
//                 variant="contained"
//                 size="large"
//                 fullWidth
//                 onClick={handleCheckout}
//                 disabled={cartItems.some((item) => !item.inStock)}
//                 sx={{ mb: 2 }}
//               >
//                 Proceed to Checkout
//               </Button>

//               <Button
//                 variant="outlined"
//                 size="large"
//                 fullWidth
//                 onClick={handleContinueShopping}
//               >
//                 Continue Shopping
//               </Button>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default ShoppingCart;
