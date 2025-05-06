import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItem, createItem, updateItem } from '../services/itemService';

function ItemForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      const fetchItem = async () => {
        try {
          setLoading(true);
          const data = await getItem(id);
          setFormData({
            name: data.name,
            description: data.description
          });
          setError(null);
        } catch (err) {
          setError('Failed to fetch item');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchItem();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (isEditMode) {
        await updateItem(id, formData);
      } else {
        await createItem(formData);
      }
      navigate('/');
    } catch (err) {
      setError(`Failed to ${isEditMode ? 'update' : 'create'} item`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="item-form">
      <h2>{isEditMode ? 'Edit Item' : 'Create New Item'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
            rows="4"
          />
        </div>
        <div className="form-actions">
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? 'Saving...' : isEditMode ? 'Update Item' : 'Create Item'}
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/')} 
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ItemForm;
