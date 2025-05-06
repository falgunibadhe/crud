import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getItem, deleteItem } from '../services/itemService';

function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        const data = await getItem(id);
        setItem(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch item');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteItem(id);
        navigate('/');
      } catch (err) {
        setError('Failed to delete item');
        console.error(err);
      }
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!item) return <div className="not-found">Item not found</div>;

  return (
    <div className="item-detail">
      <h2>{item.name}</h2>
      <p className="description">{item.description}</p>
      <p className="date">Created: {new Date(item.createdAt).toLocaleString()}</p>
      
      <div className="item-actions">
        <Link to="/" className="btn btn-secondary">Back to List</Link>
        <Link to={`/items/${id}/edit`} className="btn btn-warning">Edit</Link>
        <button onClick={handleDelete} className="btn btn-danger">Delete</button>
      </div>
    </div>
  );
}

export default ItemDetail;
