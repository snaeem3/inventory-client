import React, { useState, useEffect } from 'react';

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
    date.setDate(date.getDate() - 1);
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
    <form className="transaction-form" onSubmit={handleSubmit}>
      <label htmlFor="quantity">
        New Quantity:
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          min="0"
          step="1"
          onChange={(e) =>
            setFormData({ ...formData, quantity: e.target.value })
          }
        />
      </label>
      <label htmlFor="message">
        Note:
        <input
          type="text"
          name="note"
          placeholder="Sold my cut emerald"
          value={formData.note}
          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
        />
      </label>
      <label htmlFor="transaction-date">
        Transaction Date:
        <input
          type="date"
          name="transaction-date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
      </label>
      <button type="submit">Submit Transaction</button>
    </form>
  );
};

export default TransactionForm;
