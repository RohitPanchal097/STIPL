import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getMachines, getMachinesByCategory } from '../api/api';

const Machines = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'physical', label: 'Physical Property Testing' },
    { value: 'pulp', label: 'Pulp Testing Equipment' },
    { value: 'package', label: 'Package Testing Equipment' },
    { value: 'surface', label: 'Surface Coating & Printability' },
    { value: 'environmental', label: 'Environmental Testing' },
  ];

  useEffect(() => {
    loadMachines();
  }, [selectedCategory]);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  const loadMachines = async () => {
    try {
      setLoading(true);
      let response;
      if (selectedCategory === 'all') {
        response = await getMachines();
      } else {
        response = await getMachinesByCategory(selectedCategory);
      }
      setMachines(response.data);
    } catch (error) {
      console.error('Error loading machines:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchParams(category === 'all' ? {} : { category });
  };

  const filteredMachines = machines.filter((machine) =>
    machine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    machine.productCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Browse Machines</h1>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by name or product code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Machines Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredMachines.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No machines found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMachines.map((machine, index) => (
              <Link key={machine._id} to={`/machines/${machine.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden group"
                >
                  <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    {machine.image ? (
                      <img
                        src={`http://localhost:5000${machine.image}`}
                        alt={machine.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                      />
                    ) : (
                      <span className="text-white text-6xl">🔬</span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{machine.name}</h3>
                    <p className="text-gray-600 mb-2">Code: {machine.productCode}</p>
                    <p className="text-gray-700 mb-4 line-clamp-2">{machine.description}</p>
                    <span className="text-blue-600 font-semibold hover:text-blue-800 transition">
                      View Details →
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Machines;

