import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
    <main className="gold-page">
      <h1>Your Gold</h1>
      {!isLoggedIn && <NotLoggedIn />}
      {isLoggedIn && (
        <>
          {!showQuickEditGold ? (
            <h2>{gold}</h2>
          ) : (
            <QuickEditGoldForm
              initialQuantity={gold}
              onQuickEditGoldSubmit={handleQuickEditGold}
            />
          )}
          <div>
            <button
              type="button"
              onClick={() => {
                setShowQuickEditGold((prevState) => !prevState);
                setShowTransactionForm(false);
              }}
            >
              Quick Adjust Gold
            </button>
            <button
              type="button"
              onClick={() => {
                setShowTransactionForm((prevState) => !prevState);
                setShowQuickEditGold(false);
              }}
            >
              Create new transaction
            </button>
            {showTransactionForm && (
              <TransactionForm
                onTransactionSubmit={handleNewTransaction}
                initialQuantity={gold}
              />
            )}
            {errors.length > 0 && <Errors errors={errors} />}
            <div className="transaction-container">
              <h2>Previous Transactions</h2>
              {transactions.length > 0 ? (
                <ul className="transaction-list">
                  {transactions.toReversed().map((transaction) => (
                    <li key={transaction._id}>
                      {showEditTransactionForm === transaction._id ? (
                        <TransactionForm
                          onTransactionSubmit={handleUpdateTransaction}
                          initialNote={transaction.note}
                          initialQuantity={transaction.prevQuantity}
                          initialDate={transaction.date}
                          transactionId={transaction._id}
                        />
                      ) : (
                        <div className="transaction-detail">
                          <p className="transaction-note">{transaction.note}</p>
                          <p>
                            Previous Gold balance: {transaction.prevQuantity}
                          </p>
                          <p className="transaction-date date">
                            {formatDate(transaction.date)}
                          </p>
                        </div>
                      )}
                      <button
                        className="delete"
                        type="button"
                        onClick={() =>
                          // Set the current edit focus to current transaction otherwise hide edit form
                          setShowEditTransactionForm((prevState) =>
                            prevState === transaction._id
                              ? false
                              : transaction._id,
                          )
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="delete"
                        type="button"
                        onClick={() => handleDeleteTransaction(transaction._id)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No previous transactions</p>
              )}
            </div>
          </div>
        </>
      )}
    </main>
  );
};

const QuickEditGoldForm = (props) => {
  const { initialQuantity, onQuickEditGoldSubmit } = props;

  const [quantity, setQuantity] = useState(initialQuantity || 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onQuickEditGoldSubmit(quantity);
  };

  return (
    <form className="quickEditGold-form" onSubmit={handleSubmit}>
      <label htmlFor="quantity">
        New Quantity:
        <input
          type="number"
          name="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </label>
      <button type="submit">Submit New Quantity</button>
    </form>
  );
};

export default Gold;
