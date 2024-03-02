import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchItems } from '../apiClient';
import { useAuth } from '../hooks/useAuth';

const Catalog = (props) => {
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [sortMethod, setSortMethod] = useState('A-Z');
  const { isLoggedIn, isAdmin } = useAuth();

  useEffect(() => {
    const getCatalogItems = async () => {
      try {
        const data = await fetchItems();
        console.log(data);
        setItems(data);
      } catch (error) {
        console.error('Error: ', error);
      }
    };
    getCatalogItems();
  }, []);

  return (
    <main className="catalog">
      <h1>Catalog</h1>
      {isLoggedIn && (
        <Link to="/catalog/item/create">
          <button type="button">Create New Item</button>
        </Link>
      )}
      <ul className="item-list">
        {items.map((item) => (
          <li key={item._id}>
            <Link to={`/catalog/item/${item._id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Catalog;
