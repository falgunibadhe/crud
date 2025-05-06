import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ItemList from './components/ItemList';
import ItemDetail from './components/ItemDetail';
import ItemForm from './components/ItemForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<ItemList />} />
            <Route path="/items/new" element={<ItemForm />} />
            <Route path="/items/:id" element={<ItemDetail />} />
            <Route path="/items/:id/edit" element={<ItemForm />} />
          </Routes>
        </main>
        <footer className="footer">
          <div className="container">
            <p>CRUD App with MongoDB Atlas, React, and Vite</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
