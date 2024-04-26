import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Button, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

const TransactionForm = (props) => {
  const {
    onTransactionSubmit,
    initialNote,
    initialQuantity,
    initialDate,
    transactionId,
  } = props;

  const currentDate = new Date().toISOString().split('T')[0];
  // Function to format the initialDate
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Adjusting for time zone offset
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset()); // Adjust to local time zone
    return date.toISOString().split('T')[0];
  };

  // Format initialDate or use currentDate if initialDate is not provided
  const formattedDate = initialDate ? formatDate(initialDate) : currentDate;

  const [formData, setFormData] = useState({
    quantity: initialQuantity || 0,
    note: initialNote || '',
    date: formattedDate,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onTransactionSubmit(
      formData.quantity,
      formData.note,
      formData.date,
      transactionId,
    );
  };

  return (
    <Box
      component="form"
      className="transaction-form"
      onSubmit={handleSubmit}
      p={2}
      bgcolor="grey.100"
      borderRadius={2}
    >
      <Grid container>
        <Grid item xs={12} md={8}>
          <TextField
            type="text"
            name="note"
            label="Note"
            placeholder="Sold my cut emerald"
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <label htmlFor="quantity">
            <Typography>New Quantity:</Typography>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              min="0"
              step="1"
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
              // style={{ fontSize: '1.5rem' }}
            />
          </label>

          <label htmlFor="transaction-date">
            <Typography>Transaction Date:</Typography>
            <input
              type="date"
              name="transaction-date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />
          </label>
        </Grid>
      </Grid>
      <Button type="submit" startIcon={<SaveIcon />}>
        Save Transaction
      </Button>
    </Box>
  );
};

export default TransactionForm;
