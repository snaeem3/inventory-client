import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import HardwareIcon from '@mui/icons-material/Hardware';
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
    <Container className="user-overview">
      {joined && (
        <Typography variant="h4" sx={{ py: 2 }}>
          Joined on {formatDate(joined)}
        </Typography>
      )}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2, border: '1px solid grey', borderRadius: 4 }}>
            <Typography
              component="h2"
              variant="h3"
              color="primary"
              gutterBottom
            >
              Gold:
              <Typography component="p" variant="h2" color="secondary">
                {gold}
              </Typography>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2, border: '1px solid grey', borderRadius: 4 }}>
            <Typography
              component="h2"
              variant="h3"
              color="primary"
              gutterBottom
            >
              Net Worth:
              <Typography component="p" variant="h2" color="secondary">
                {netWorth}
              </Typography>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} className="most-valuable-items-container">
          <Box sx={{ p: 2, bgcolor: 'grey.300', borderRadius: 4 }}>
            <Typography component="h2" variant="h3" color="primary">
              Most Valuable Items
            </Typography>
            <List className="most-valuable-items">
              {inventoryItems &&
                inventoryItems
                  .sort((a, b) => b.item.value - a.item.value)
                  .slice(0, 3) // Select only the first 3 elements after sorting
                  .map((inventoryItem) => (
                    <Link
                      to={`/catalog/item/${inventoryItem.item._id}`}
                      key={inventoryItem._id}
                      style={{ textDecoration: 'none' }}
                    >
                      <ListItem
                        sx={{ my: 2, bgcolor: 'white', borderRadius: 4 }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            src={inventoryItem.item.picture}
                            alt={inventoryItem.item.name}
                          >
                            <HardwareIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={inventoryItem.item.name}
                          secondary={`${inventoryItem.item.value} gold`}
                        />
                      </ListItem>
                    </Link>
                  ))}
            </List>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} className="newest-items-container">
          <Box sx={{ p: 2, bgcolor: 'grey.300', borderRadius: 4 }}>
            <Typography component="h2" variant="h3" color="primary">
              Newest Items
            </Typography>
            <List>
              {inventoryItems &&
                inventoryItems
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .slice(0, 3) // Select only the first 3 elements after sorting
                  .map((inventoryItem) => (
                    <Link
                      to={`/catalog/item/${inventoryItem.item._id}`}
                      key={inventoryItem._id}
                      style={{ textDecoration: 'none' }}
                    >
                      <ListItem
                        sx={{ my: 2, bgcolor: 'white', borderRadius: 4 }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            src={inventoryItem.item.picture}
                            alt={inventoryItem.item.name}
                          >
                            <HardwareIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={inventoryItem.item.name}
                          secondary={
                            inventoryItem.createdAt &&
                            formatDate(inventoryItem.createdAt)
                          }
                        />
                      </ListItem>
                    </Link>
                  ))}
            </List>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserOverview;
