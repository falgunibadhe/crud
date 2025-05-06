import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">CRUD App</Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/items/new" className="nav-link">Add Item</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
