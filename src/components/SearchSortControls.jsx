import {
  Box,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';

/**
 * Component for displaying search and sort controls for inventory items.
 * @param {Object} props - The component props.
 * @param {function} props.handleSearchChange - Function to handle search input change.
 * @param {function} props.handleSortChange - Function to handle sort select change.
 * @returns {JSX.Element} The rendered search and sort controls.
 */
const SearchSortControls = (props) => {
  const { handleSearchChange, handleSortChange } = props;

  return (
    <Box
      className="inventory-controls-container"
      display="flex"
      flexDirection={{ xs: 'column', md: 'row' }}
      justifyContent="center"
      alignItems="center"
      gap={2}
    >
      <Box className="search-box">
        <TextField
          type="search"
          id="search-bar"
          name="search-bar"
          onChange={(e) => handleSearchChange(e)}
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <FormControl sx={{ m: 1, minWidth: 120 }} className="sort-box">
        <InputLabel htmlFor="sort-select">Sort</InputLabel>
        <Select
          name="sort-select"
          id="sort-select"
          native
          defaultValue=""
          onChange={(e) => handleSortChange(e)}
          label="Sort"
        >
          <optgroup label="Name">
            <option value="A-Z">Name A-Z</option>
            <option value="Z-A">Name Z-A</option>
          </optgroup>
          <optgroup label="Gold Value">
            <option value="value low-high">Value low-high</option>
            <option value="value high-low">Value high-low</option>
          </optgroup>
        </Select>
      </FormControl>
      {/* <div className="equipped-box"></div> */}
    </Box>
  );
};

export default SearchSortControls;
