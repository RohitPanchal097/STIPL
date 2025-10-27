import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMachinesAdmin } from '../api/api';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    loadMachines();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
    }
  };

  const loadMachines = async () => {
    try {
      const response = await getMachinesAdmin();
      setMachines(response.data);
    } catch (error) {
      console.error('Error loading machines:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Admin Dashboard</h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/admin/machines')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Manage Machines
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <h2 className="text-2xl font-semibold mb-6">Statistics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Total Machines</h3>
              <p className="text-4xl font-bold">{loading ? '...' : machines.length}</p>
            </div>
            
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Categories</h3>
              <p className="text-4xl font-bold">
                {loading ? '...' : new Set(machines.map(m => m.category)).size}
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Last Added</h3>
              <p className="text-lg font-semibold">
                {loading ? '...' : machines.length > 0 && new Date(machines[0].dateAdded).toLocaleDateString()}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => navigate('/admin/machines?action=add')}
                className="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition text-left group"
              >
                <div className="text-4xl mb-2 group-hover:scale-110 transition">
                  ➕
                </div>
                <h3 className="text-xl font-semibold mb-2">Add New Machine</h3>
                <p className="text-gray-600">Create a new machine entry</p>
              </button>

              <button
                onClick={() => navigate('/admin/machines')}
                className="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition text-left group"
              >
                <div className="text-4xl mb-2 group-hover:scale-110 transition">
                  📋
                </div>
                <h3 className="text-xl font-semibold mb-2">Manage Machines</h3>
                <p className="text-gray-600">Edit or delete existing machines</p>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;

