import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { fetchGold, quickEditGold, addTransaction } from '../apiClient';
import NotLoggedIn from '../components/NotLoggedIn';
import TransactionForm from '../components/TransactionForm';

const dateOptions = {
  // weekday: 'long',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
};

const formatDate = (inputDate) => {
  const date = new Date(inputDate);
  return date.toLocaleDateString('en-US', dateOptions);
};

const Gold = (props) => {
  const { userId, isLoggedIn } = useAuth();
  const [gold, setGold] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTransactionForm, setShowTransactionForm] = useState(false);

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
      const response = await quickEditGold(userId, {
        newQuantity,
      });
      console.log('Gold changed successfully', response);
      // await getGold();
      setGold(response.quantity);
      setTransactions(response.transactions);
    } catch (error) {
      console.error('Error changing gold: ', error);
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
    } catch (error) {
      console.error('Error adding transaction: ', error);
    }
  };

  //   const handleEditTransaction
  //   const handleDeleteTransaction

  useEffect(() => {
    getGold(userId);
    setLoading(false);
  }, [userId]);

  return (
    <main>
      <h1>Your Gold</h1>
      {!isLoggedIn && <NotLoggedIn />}
      {isLoggedIn && (
        <>
          <h2>{gold}</h2>
          <div>
            <button type="button">Quick Adjust Gold</button>
            <button
              type="button"
              onClick={() => setShowTransactionForm((prevState) => !prevState)}
            >
              Create new transaction
            </button>
            {showTransactionForm && (
              <TransactionForm
                onTransactionSubmit={handleNewTransaction}
                initialQuantity={gold}
              />
            )}
            <div className="transaction-container">
              <h2>Previous Transactions</h2>
              {transactions.length > 0 ? (
                <ul className="transaction-list">
                  {transactions.map((transaction) => (
                    <li key={transaction._id}>
                      <p className="transaction-note">{transaction.note}</p>
                      <p>Previous Gold balance: {transaction.prevQuantity}</p>
                      <p className="transaction-date date">
                        {formatDate(transaction.date)}
                      </p>
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

export default Gold;
