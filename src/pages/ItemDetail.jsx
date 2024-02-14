import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchItem } from '../apiClient';
import Loading from '../components/Loading';

const ItemDetail = (props) => {
  const { itemId } = useParams();
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getItemDetail = async () => {
      try {
        const data = await fetchItem(itemId);
        setItem(data);
      } catch (error) {
        console.error('Error: ', error);
      } finally {
        setLoading(false);
      }
    };
    getItemDetail();
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h1>{`${item.name}`}</h1>
          <div>
            <p>Description: {item.description}</p>
            <p className="rarity">
              Rarity: <span className={item.rarity}>{item.rarity}</span>
            </p>
            <p>Value: {item.value}</p>
            <p>Equippable: {item.equippable ? '✅' : '❌'}</p>
          </div>
        </div>
      )}
      <Link to="/catalog">Return to Catalog</Link>
    </div>
  );
};

export default ItemDetail;
