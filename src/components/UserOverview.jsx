import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import formatDate from '../utils/formatDate';

/**
 * Component for displaying an overview of user details and inventory items.
 * @param {Object} props - The component props.
 * @param {string} props.name - The name of the user.
 * @param {Object[]} props.inventoryItems - The array of inventory items.
 * @param {Date} props.joined - The date when the user joined.
 * @param {Date} props.lastUpdated - The date when the user's details were last updated.
 * @param {number} props.gold - The amount of gold owned by the user.
 * @param {number} props.netWorth - The net worth of the user.
 * @returns {JSX.Element} The rendered user overview component.
 */
const UserOverview = (props) => {
  const { name, inventoryItems, joined, lastUpdated, gold, netWorth } = props;

  return (
    <div className="user-overview">
      {joined && <h2>Joined on {formatDate(joined)}</h2>}
      <h2>Gold: {gold}</h2>
      <h2>Net Worth: {netWorth}</h2>
      <div className="most-valuable-items-container">
        <h2>Most Valuable Items</h2>
        <ol className="most-valuable-items">
          {inventoryItems &&
            inventoryItems
              .sort((a, b) => b.item.value - a.item.value)
              .slice(0, 3) // Select only the first 3 elements after sorting
              .map((inventoryItem) => (
                <li key={inventoryItem._id}>
                  <Link to={`/catalog/item/${inventoryItem.item._id}`}>
                    {inventoryItem.item.picture && (
                      <img
                        src={inventoryItem.item.picture}
                        className="preview"
                        alt={inventoryItem.item.name}
                      />
                    )}{' '}
                    {inventoryItem.item.name}{' '}
                  </Link>{' '}
                  - ({inventoryItem.item.value})
                </li>
              ))}
        </ol>
      </div>
      <div className="newest-items-container">
        <h2>Newest Items</h2>
        <ol className="newest-items">
          {inventoryItems &&
            inventoryItems
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 3) // Select only the first 3 elements after sorting
              .map((inventoryItem) => (
                <li key={inventoryItem._id}>
                  <Link to={`/catalog/item/${inventoryItem.item._id}`}>
                    {inventoryItem.item.picture && (
                      <img
                        src={inventoryItem.item.picture}
                        className="preview"
                        alt={inventoryItem.item.name}
                      />
                    )}
                    {inventoryItem.item.name}
                  </Link>{' '}
                  {inventoryItem.createdAt &&
                    formatDate(inventoryItem.createdAt)}
                </li>
              ))}
        </ol>
      </div>
    </div>
  );
};

export default UserOverview;
