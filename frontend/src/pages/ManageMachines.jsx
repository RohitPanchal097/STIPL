import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getMachinesAdmin, createMachine, updateMachine, deleteMachine, uploadImage } from '../api/api';

const ManageMachines = () => {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMachine, setEditingMachine] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    category: 'physical',
    productCode: '',
    dimensions: '',
    description: '',
    features: [''],
    specifications: [{ key: '', value: '' }],
    image: '',
    gallery: []
  });

  useEffect(() => {
    checkAuth();
    loadMachines();
    if (searchParams.get('action') === 'add') {
      setShowModal(true);
    }
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

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this machine?')) return;

    try {
      await deleteMachine(id);
      loadMachines();
    } catch (error) {
      console.error('Error deleting machine:', error);
    }
  };

  const handleEdit = (machine) => {
    setEditingMachine(machine);
    setFormData({
      name: machine.name,
      category: machine.category,
      productCode: machine.productCode,
      dimensions: machine.dimensions || '',
      description: machine.description,
      features: machine.features.length > 0 ? machine.features : [''],
      specifications: machine.specifications.length > 0 ? machine.specifications : [{ key: '', value: '' }],
      image: machine.image || '',
      gallery: machine.gallery || []
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        features: formData.features.filter(f => f.trim()),
        specifications: formData.specifications.filter(s => s.key.trim() && s.value.trim())
      };

      if (editingMachine) {
        await updateMachine(editingMachine._id, dataToSend);
      } else {
        await createMachine(dataToSend);
      }
      
      setShowModal(false);
      setEditingMachine(null);
      setFormData({
        name: '',
        category: 'physical',
        productCode: '',
        dimensions: '',
        description: '',
        features: [''],
        specifications: [{ key: '', value: '' }],
        image: '',
        gallery: []
      });
      loadMachines();
    } catch (error) {
      console.error('Error saving machine:', error);
      alert('Error saving machine. Please try again.');
    }
  };

  const handleImageUpload = async (e, type = 'image') => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await uploadImage(formData);
      const imageUrl = response.data.url;
      
      if (type === 'gallery') {
        setFormData({
          ...formData,
          gallery: [...formData.gallery, imageUrl]
        });
      } else {
        setFormData({ ...formData, image: imageUrl });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    }
  };

  const removeGalleryImage = (index) => {
    setFormData({
      ...formData,
      gallery: formData.gallery.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Manage Machines</h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              Dashboard
            </button>
            <button
              onClick={() => {
                setEditingMachine(null);
                setFormData({
                  name: '',
                  category: 'physical',
                  productCode: '',
                  dimensions: '',
                  description: '',
                  features: [''],
                  specifications: [{ key: '', value: '' }],
                  image: '',
                  gallery: []
                });
                setShowModal(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Add Machine
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {machines.map((machine) => (
                  <tr key={machine._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{machine.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{machine.productCode}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {machine.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(machine)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(machine._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">
                {editingMachine ? 'Edit Machine' : 'Add New Machine'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Product Code *</label>
                    <input
                      type="text"
                      required
                      value={formData.productCode}
                      onChange={(e) => setFormData({ ...formData, productCode: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Category *</label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    >
                      <option value="physical">Physical Property Testing</option>
                      <option value="pulp">Pulp Testing Equipment</option>
                      <option value="package">Package Testing Equipment</option>
                      <option value="surface">Surface Coating & Printability</option>
                      <option value="environmental">Environmental Testing</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Dimensions</label>
                    <input
                      type="text"
                      value={formData.dimensions}
                      onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description *</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Features (one per line)</label>
                  {formData.features.map((feature, index) => (
                    <input
                      key={index}
                      type="text"
                      value={feature}
                      onChange={(e) => {
                        const newFeatures = [...formData.features];
                        newFeatures[index] = e.target.value;
                        setFormData({ ...formData, features: newFeatures });
                      }}
                      placeholder={`Feature ${index + 1}`}
                      className="w-full px-3 py-2 border rounded-lg mb-2"
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, features: [...formData.features, ''] })}
                    className="text-blue-600 text-sm"
                  >
                    + Add Feature
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Specifications</label>
                  {formData.specifications.map((spec, index) => (
                    <div key={index} className="grid grid-cols-2 gap-2 mb-2">
                      <input
                        type="text"
                        value={spec.key}
                        onChange={(e) => {
                          const newSpecs = [...formData.specifications];
                          newSpecs[index].key = e.target.value;
                          setFormData({ ...formData, specifications: newSpecs });
                        }}
                        placeholder="Key"
                        className="px-3 py-2 border rounded-lg"
                      />
                      <input
                        type="text"
                        value={spec.value}
                        onChange={(e) => {
                          const newSpecs = [...formData.specifications];
                          newSpecs[index].value = e.target.value;
                          setFormData({ ...formData, specifications: newSpecs });
                        }}
                        placeholder="Value"
                        className="px-3 py-2 border rounded-lg"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, specifications: [...formData.specifications, { key: '', value: '' }] })}
                    className="text-blue-600 text-sm"
                  >
                    + Add Specification
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Main Image</label>
                  {formData.image && (
                    <img src={`http://localhost:5000${formData.image}`} alt="Preview" className="w-32 h-32 object-cover mb-2 rounded" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'image')}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Gallery Images</label>
                  {formData.gallery.map((img, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <img src={`http://localhost:5000${img}`} alt="Gallery" className="w-16 h-16 object-cover rounded mr-2" />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(index)}
                        className="text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'gallery')}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    {editingMachine ? 'Update Machine' : 'Add Machine'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingMachine(null);
                    }}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ManageMachines;

