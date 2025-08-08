import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Container,
  Tabs,
  Tab,
  Alert,
} from "@mui/material";
import {
  Person,
  ShoppingBag,
  Favorite,
  Settings,
  Edit,
  Save,
  Cancel,
  LocationOn,
  Phone,
  Email,
  CalendarToday,
} from "@mui/icons-material";

// Mock user data - in a real app, this would come from an API
const mockUser = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Main St, City, State 12345",
  joinDate: "2024-01-15",
  avatar: "https://via.placeholder.com/150x150?text=JD",
};

// Mock order history
const mockOrders = [
  {
    id: "ORD-001",
    date: "2024-07-10",
    status: "Delivered",
    total: 299.97,
    items: 3,
  },
  {
    id: "ORD-002",
    date: "2024-07-05",
    status: "Shipped",
    total: 149.99,
    items: 1,
  },
  {
    id: "ORD-003",
    date: "2024-06-28",
    status: "Processing",
    total: 89.99,
    items: 2,
  },
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return "success";
    case "shipped":
      return "info";
    case "processing":
      return "warning";
    default:
      return "default";
  }
};

const UserProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(mockUser);
  const [editedData, setEditedData] = useState(mockUser);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData(userData);
  };

  const handleSave = () => {
    setUserData(editedData);
    setIsEditing(false);
    // TODO: Save to API
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(userData);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const renderProfileInfo = () => (
    <Card>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Avatar src={userData.avatar} sx={{ width: 80, height: 80, mr: 3 }} />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h5" component="h2">
              {userData.firstName} {userData.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Member since {new Date(userData.joinDate).toLocaleDateString()}
            </Typography>
          </Box>
          <Button
            variant="outlined"
            startIcon={isEditing ? <Save /> : <Edit />}
            onClick={isEditing ? handleSave : handleEdit}
          >
            {isEditing ? "Save" : "Edit"}
          </Button>
          {isEditing && (
            <Button
              variant="outlined"
              color="error"
              startIcon={<Cancel />}
              onClick={handleCancel}
              sx={{ ml: 1 }}
            >
              Cancel
            </Button>
          )}
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              value={isEditing ? editedData.firstName : userData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              disabled={!isEditing}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              value={isEditing ? editedData.lastName : userData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              disabled={!isEditing}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              value={isEditing ? editedData.email : userData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              disabled={!isEditing}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone"
              value={isEditing ? editedData.phone : userData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              disabled={!isEditing}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              value={isEditing ? editedData.address : userData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              disabled={!isEditing}
              multiline
              rows={2}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const renderOrderHistory = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Order History
        </Typography>
        {mockOrders.length > 0 ? (
          <List>
            {mockOrders.map((order, index) => (
              <Box key={order.id}>
                <ListItem>
                  <ListItemIcon>
                    <ShoppingBag />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="subtitle1" fontWeight="bold">
                          {order.id}
                        </Typography>
                        <Chip
                          label={order.status}
                          color={getStatusColor(order.status) as any}
                          size="small"
                        />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {new Date(order.date).toLocaleDateString()} •{" "}
                          {order.items} items
                        </Typography>
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="primary"
                        >
                          ${order.total.toFixed(2)}
                        </Typography>
                      </Box>
                    }
                  />
                  <Button variant="outlined" size="small">
                    View Details
                  </Button>
                </ListItem>
                {index < mockOrders.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        ) : (
          <Alert severity="info">
            No orders found. Start shopping to see your order history here!
          </Alert>
        )}
      </CardContent>
    </Card>
  );

  const renderAccountSettings = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Account Settings
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText
              primary="Change Password"
              secondary="Update your account password"
            />
            <Button variant="outlined" size="small">
              Change
            </Button>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <LocationOn />
            </ListItemIcon>
            <ListItemText
              primary="Shipping Addresses"
              secondary="Manage your delivery addresses"
            />
            <Button variant="outlined" size="small">
              Manage
            </Button>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <Favorite />
            </ListItemIcon>
            <ListItemText
              primary="Wishlist"
              secondary="View your saved items"
            />
            <Button variant="outlined" size="small">
              View
            </Button>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <Email />
            </ListItemIcon>
            <ListItemText
              primary="Email Preferences"
              secondary="Manage your email notifications"
            />
            <Button variant="outlined" size="small">
              Configure
            </Button>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          User Profile
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your account information and preferences
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Profile" icon={<Person />} />
          <Tab label="Orders" icon={<ShoppingBag />} />
          <Tab label="Settings" icon={<Settings />} />
        </Tabs>
      </Box>

      {activeTab === 0 && renderProfileInfo()}
      {activeTab === 1 && renderOrderHistory()}
      {activeTab === 2 && renderAccountSettings()}
    </Container>
  );
};

export default UserProfile;
