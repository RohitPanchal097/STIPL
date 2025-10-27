import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">MachineCatalog</h3>
            <p className="text-gray-400">
              Your trusted partner for industrial testing equipment and machinery solutions.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/machines" className="hover:text-white transition">All Machines</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/machines?category=physical" className="hover:text-white transition">Physical Testing</Link></li>
              <li><Link to="/machines?category=pulp" className="hover:text-white transition">Pulp Testing</Link></li>
              <li><Link to="/machines?category=package" className="hover:text-white transition">Package Testing</Link></li>
              <li><Link to="/machines?category=surface" className="hover:text-white transition">Surface Coating</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@machinecatalog.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Industrial Blvd, Tech City</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 MachineCatalog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

