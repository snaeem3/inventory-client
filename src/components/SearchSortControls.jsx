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
    <div className="inventory-controls-container">
      <div className="search-box">
        <label htmlFor="search-bar">Search Inventory</label>
        <div className="search-bar-wrapper">
          <span className="input" />
          <input
            type="search"
            id="search-bar"
            name="search-bar"
            onChange={(e) => handleSearchChange(e)}
          />
        </div>
      </div>
      <div className="sort-box">
        <label htmlFor="sort-select">Sort Items by:</label>
        <select
          name="sort-select"
          id="sort-select"
          onChange={(e) => handleSortChange(e)}
        >
          <optgroup label="Name">
            <option value="A-Z">Name A-Z</option>
            <option value="Z-A">Name Z-A</option>
          </optgroup>
          <optgroup label="Value">
            <option value="value low-high">Value low-high</option>
            <option value="value high-low">Value high-low</option>
          </optgroup>
        </select>
      </div>
      {/* <div className="equipped-box"></div> */}
    </div>
  );
};

export default SearchSortControls;
