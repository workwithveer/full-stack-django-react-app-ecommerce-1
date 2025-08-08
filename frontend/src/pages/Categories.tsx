import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useGetAllCategoriesQuery } from "../store/api/categoriesApi";
import type { Category } from "../models/category";

interface CategoriesProps {
  selectedCategory?: Category | null;
  onCategorySelect: (category: Category | null) => void;
}

const Categories: React.FC<CategoriesProps> = ({
  selectedCategory,
  onCategorySelect,
}) => {
  const { data: categories, isLoading, error } = useGetAllCategoriesQuery();

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        Error loading categories
      </Alert>
    );
  }

  console.log("categories", categories);

  return (
    <Box>
      <Typography variant="h6" component="h2" gutterBottom>
        Categories
      </Typography>

      <List sx={{ p: 0 }}>
        <ListItem disablePadding>
          <ListItemButton
            selected={!selectedCategory}
            onClick={() => onCategorySelect(null)}
            sx={{
              borderRadius: 1,
              mb: 1,
              "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "primary.contrastText",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              },
            }}
          >
            <ListItemText primary="All Categories" />
            <Chip
              label={categories?.length || 0}
              size="small"
              color="default"
              variant="outlined"
            />
          </ListItemButton>
        </ListItem>

        {categories?.map((category: Category) => (
          <ListItem key={category.id} disablePadding>
            <ListItemButton
              selected={selectedCategory?.id === category.id}
              onClick={() => onCategorySelect(category)}
              sx={{
                borderRadius: 1,
                mb: 1,
                "&.Mui-selected": {
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                },
              }}
            >
              <ListItemText primary={category.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Categories;
