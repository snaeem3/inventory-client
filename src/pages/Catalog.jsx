import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchItems } from '../apiClient';
import { useAuth } from '../hooks/useAuth';
import sortArrayOfItems from '../utils/sortArrayOfItems';
import SearchSortControls from '../components/SearchSortControls';

const Catalog = (props) => {
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [sortMethod, setSortMethod] = useState('A-Z');
  const { isLoggedIn, isAdmin } = useAuth();

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortMethod(event.target.value);
  };

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
      <SearchSortControls
        handleSearchChange={handleSearchChange}
        handleSortChange={handleSortChange}
      />
      <ul className="item-list">
        {sortArrayOfItems(items, sortMethod).map((item) => {
          if (
            searchText.length > 0 &&
            !item.name.toLowerCase().includes(searchText.toLowerCase())
          )
            return; // This item does NOT match search criteria

          return (
            <li key={item._id}>
              <Link to={`/catalog/item/${item._id}`}>{item.name}</Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default Catalog;
