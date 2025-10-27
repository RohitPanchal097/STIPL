import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            MachineCatalog
          </Link>
          
          <div className="flex gap-8">
            <Link
              to="/"
              className={`hover:text-blue-600 transition ${isActive('/') ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}
            >
              Home
            </Link>
            <Link
              to="/machines"
              className={`hover:text-blue-600 transition ${isActive('/machines') ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}
            >
              Machines
            </Link>
            <Link
              to="/about"
              className={`hover:text-blue-600 transition ${isActive('/about') ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`hover:text-blue-600 transition ${isActive('/contact') ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}
            >
              Contact
            </Link>
            <Link
              to="/admin"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Admin
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

