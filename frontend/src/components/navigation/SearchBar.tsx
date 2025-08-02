import React, { useState } from "react";
import { Box, InputBase, IconButton, Paper, alpha } from "@mui/material";
import { Search as SearchIcon, Clear as ClearIcon } from "@mui/icons-material";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search products...",
}) => {
  const [query, setQuery] = useState("");

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSearch}
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: { xs: "100%", sm: 400 },
        backgroundColor: alpha("#fff", 0.9),
        "&:hover": {
          backgroundColor: "#fff",
        },
      }}
    >
      <IconButton sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        inputProps={{ "aria-label": "search products" }}
      />
      {query && (
        <IconButton sx={{ p: "10px" }} aria-label="clear" onClick={handleClear}>
          <ClearIcon />
        </IconButton>
      )}
    </Paper>
  );
};
