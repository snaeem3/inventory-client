import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Box,
  Grid,
  Stack,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { useAuth } from '../hooks/useAuth';
import {
  fetchGold,
  quickEditGold,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from '../apiClient';
import NotLoggedIn from '../components/NotLoggedIn';
import Errors from '../components/Errors';
import TransactionForm from '../components/TransactionForm';
import formatDate from '../utils/formatDate';

const Gold = (props) => {
  const { userId, isLoggedIn } = useAuth();
  const [gold, setGold] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [showQuickEditGold, setShowQuickEditGold] = useState(false);
  const [toggleButtonState, setToggleButtonState] = useState('');
  const [showEditTransactionForm, setShowEditTransactionForm] = useState(false); // update this state with transaction id

  const getGold = async (id) => {
    try {
      const data = await fetchGold(id);
      setGold(data.quantity);
      setTransactions(data.transactions);
    } catch (error) {
      console.error('Error getting gold data: ', error);
    }
  };

  const handleQuickEditGold = async (newQuantity) => {
    try {
      const response = await quickEditGold(userId, newQuantity);
      console.log('Gold changed successfully', response);
      setShowQuickEditGold(false);
      // await getGold();
      setGold(response.quantity);
      setTransactions(response.transactions);
      setErrors([]);
    } catch (error) {
      console.error('Error quick editing gold: ', error.response?.data);
      setErrors(error.response?.data?.errors?.map((err) => err.msg));
    }
  };

  const handleNewTransaction = async (newQuantity, note, date) => {
    try {
      const response = await addTransaction(userId, newQuantity, note, date);
      console.log('Transaction successfully added: ', response);
      setShowTransactionForm(false);
      // await getGold();
      setGold(response.quantity);
      setTransactions(response.transactions);
      setErrors([]);
    } catch (error) {
      console.error('Error adding transaction: ', error.response?.data);
      setErrors(error.response?.data?.errors?.map((err) => err.msg));
    }
  };

  // Quick Adjust Gold vs. New Transaction toggle button
  const handleToggleButtonState = (event, newToggleState) => {
    setToggleButtonState(newToggleState);
  };

  const handleUpdateTransaction = async (
    quantity,
    note,
    date,
    transactionId,
  ) => {
    console.log('transactionId: ', transactionId);
    try {
      const response = await updateTransaction(
        userId,
        transactionId,
        quantity,
        note,
        date,
      );
      console.log(
        `Transaction ${transactionId} successfully updated: `,
        response,
      );
      setTransactions(response.transactions);
      setShowEditTransactionForm(false);
    } catch (error) {
      console.error(
        `Error updating transaction ${transactionId}: `,
        error.response?.data,
      );
      setErrors(error.response?.data?.errors?.map((err) => err.msg));
    }
  };

  const handleDeleteTransaction = async (transactionId) => {
    try {
      const response = await deleteTransaction(userId, transactionId);
      console.log('Transaction successfully deleted: ', response);
      setTransactions(response.transactions);
    } catch (error) {
      console.error('Error deleting transaction: ', error.response?.data);
    }
  };

  useEffect(() => {
    getGold(userId);
    setLoading(false);
  }, [userId]);

  return (
    <Container component="main" className="gold-page" maxWidth="s">
      <Typography variant="h1">Your Gold</Typography>
      {!isLoggedIn ? (
        <NotLoggedIn />
      ) : (
        <>
          <Typography variant="h2" py={2}>
            {gold}
          </Typography>

          <Dialog
            open={showQuickEditGold}
            onClose={() => {
              setShowQuickEditGold((prevState) => !prevState);
              setToggleButtonState('');
            }}
          >
            <QuickEditGoldForm
              initialQuantity={gold}
              onQuickEditGoldSubmit={handleQuickEditGold}
              handleClose={() => setToggleButtonState('')}
            />
          </Dialog>

          <div>
            <ToggleButtonGroup
              exclusive
              value={toggleButtonState}
              onChange={handleToggleButtonState}
            >
              <ToggleButton
                type="button"
                onClick={() => {
                  setShowQuickEditGold((prevState) => !prevState);
                  setShowTransactionForm(false);
                }}
                value="quick-adjust-gold"
              >
                Quick Adjust Gold
              </ToggleButton>
              <ToggleButton
                type="button"
                onClick={() => {
                  setShowTransactionForm((prevState) => !prevState);
                  setShowQuickEditGold(false);
                }}
                value="create-new-transaction"
              >
                Create New Transaction
              </ToggleButton>
            </ToggleButtonGroup>
            {showTransactionForm && (
              <TransactionForm
                onTransactionSubmit={handleNewTransaction}
                initialQuantity={gold}
              />
            )}
            {errors.length > 0 && <Errors errors={errors} />}
            <Box className="transaction-container" sx={{ my: 2 }}>
              <Typography
                variant="h2"
                textAlign="start"
                sx={{ borderBottom: '2px solid black', my: 1 }}
              >
                Transactions
              </Typography>
              {transactions.length > 0 ? (
                <Stack spacing={2} className="transaction-list">
                  {transactions.toReversed().map((transaction) => (
                    <Card key={transaction._id}>
                      {showEditTransactionForm === transaction._id ? (
                        <TransactionForm
                          onTransactionSubmit={handleUpdateTransaction}
                          initialNote={transaction.note}
                          initialQuantity={transaction.prevQuantity}
                          initialDate={transaction.date}
                          transactionId={transaction._id}
                        />
                      ) : (
                        <CardContent
                          sx={{ flex: '1 0 auto' }}
                          className="transaction-detail"
                        >
                          <Grid container>
                            <Grid item xs={12} md={8}>
                              <Typography
                                variant="h4"
                                className="transaction-note"
                                sx={{ overflowWrap: 'break-word' }}
                              >
                                {transaction.note}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                              <Typography
                                variant="body1"
                                textAlign={{ xs: 'center', md: 'end' }}
                              >
                                Previous Gold balance:{' '}
                                <strong>{transaction.prevQuantity}</strong>
                              </Typography>

                              <Typography
                                variant="subtitle1"
                                color="text.secondary"
                                textAlign={{ xs: 'center', md: 'end' }}
                                className="transaction-date date"
                              >
                                {formatDate(transaction.date)}
                              </Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      )}
                      <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Button
                          className="edit"
                          type="button"
                          onClick={() =>
                            // Set the current edit focus to current transaction otherwise hide edit form
                            setShowEditTransactionForm((prevState) =>
                              prevState === transaction._id
                                ? false
                                : transaction._id,
                            )
                          }
                          startIcon={<EditIcon />}
                        >
                          Edit
                        </Button>
                        <Button
                          className="delete"
                          type="button"
                          onClick={() =>
                            handleDeleteTransaction(transaction._id)
                          }
                          color="error"
                          startIcon={<DeleteIcon />}
                        >
                          Delete
                        </Button>
                      </CardActions>
                    </Card>
                  ))}
                </Stack>
              ) : (
                <Typography>No previous transactions</Typography>
              )}
            </Box>
          </div>
        </>
      )}
    </Container>
  );
};

const QuickEditGoldForm = (props) => {
  const { initialQuantity, onQuickEditGoldSubmit, handleClose } = props;

  const [quantity, setQuantity] = useState(initialQuantity || 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onQuickEditGoldSubmit(quantity);
    handleClose();
  };

  return (
    <Box
      component="form"
      className="quickEditGold-form"
      onSubmit={handleSubmit}
      maxWidth="xs"
    >
      <Paper sx={{ p: 2 }}>
        <Stack spacing={1}>
          <DialogTitle variant="h4">New Quantity:</DialogTitle>
          <DialogContent>
            <input
              type="number"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              style={{
                boxSizing: 'border-box',
                padding: '.5rem',
                border: '2px solid #ccc',
                borderRadius: '.5rem',
                fontSize: '1rem',
                transition: 'border-color 0.3s ease',
                textAlign: 'center',
                width: '100%',
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit" startIcon={<SaveIcon />}>
              Save New Quantity
            </Button>
          </DialogActions>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Gold;
