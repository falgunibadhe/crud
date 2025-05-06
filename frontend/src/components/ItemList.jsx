import { useState, useEffect } from 'react';
import { getItems, deleteItem } from '../services/itemService';
import { Link } from 'react-router-dom';

function ItemList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await getItems();
      setItems(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch items');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteItem(id);
        setItems(items.filter(item => item._id !== id));
      } catch (err) {
        setError('Failed to delete item');
        console.error(err);
      }
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="item-list">
      <h2>Items</h2>
      <Link to="/items/new" className="btn btn-primary">Add New Item</Link>
      
      {items.length === 0 ? (
        <p className="no-items">No items found</p>
      ) : (
        <ul className="items">
          {items.map(item => (
            <li key={item._id} className="item-card">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="item-actions">
                <Link to={`/items/${item._id}`} className="btn btn-info">View</Link>
                <Link to={`/items/${item._id}/edit`} className="btn btn-warning">Edit</Link>
                <button onClick={() => handleDelete(item._id)} className="btn btn-danger">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ItemList;
