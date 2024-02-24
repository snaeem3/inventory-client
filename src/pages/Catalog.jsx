import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchItems } from '../apiClient';

const Catalog = (props) => {
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [sortMethod, setSortMethod] = useState('A-Z');

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
    <div>
      <h1>Catalog</h1>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <Link to={`/catalog/item/${item._id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Catalog;
