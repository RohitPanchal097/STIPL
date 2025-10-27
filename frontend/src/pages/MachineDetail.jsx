import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getMachineBySlug } from '../api/api';
import ImageLightbox from '../components/ImageLightbox';

const MachineDetail = () => {
  const { slug } = useParams();
  const [machine, setMachine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState('');

  useEffect(() => {
    loadMachine();
  }, [slug]);

  const loadMachine = async () => {
    try {
      const response = await getMachineBySlug(slug);
      setMachine(response.data);
    } catch (error) {
      console.error('Error loading machine:', error);
    } finally {
      setLoading(false);
    }
  };

  const openLightbox = (imageUrl) => {
    setLightboxImage(imageUrl);
    setLightboxOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading machine details...</p>
        </div>
      </div>
    );
  }

  if (!machine) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Machine Not Found</h2>
          <p className="text-gray-600 mt-2">The machine you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          {/* Image Section */}
          <div className="grid md:grid-cols-2 gap-6 p-6">
            <div>
              {machine.image ? (
                <div className="cursor-pointer" onClick={() => openLightbox(`http://localhost:5000${machine.image}`)}>
                  <img
                    src={`http://localhost:5000${machine.image}`}
                    alt={machine.name}
                    className="w-full h-96 object-cover rounded-lg hover:scale-105 transition duration-300"
                  />
                </div>
              ) : (
                <div className="w-full h-96 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-8xl">🔬</span>
                </div>
              )}

              {/* Gallery */}
              {machine.gallery && machine.gallery.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {machine.gallery.map((img, index) => (
                    <img
                      key={index}
                      src={`http://localhost:5000${img}`}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-75 transition"
                      onClick={() => openLightbox(`http://localhost:5000${img}`)}
                    />
                  ))}
                </div>
              )}
            </div>

            <div>
              <h1 className="text-4xl font-bold mb-4">{machine.name}</h1>
              <div className="space-y-3 mb-6">
                <div>
                  <span className="font-semibold text-gray-700">Product Code:</span>
                  <span className="ml-2 text-gray-600">{machine.productCode}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Category:</span>
                  <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {machine.category}
                  </span>
                </div>
                {machine.dimensions && (
                  <div>
                    <span className="font-semibold text-gray-700">Dimensions:</span>
                    <span className="ml-2 text-gray-600">{machine.dimensions}</span>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed">{machine.description}</p>
              </div>
            </div>
          </div>

          {/* Features and Specifications */}
          <div className="p-6 border-t border-gray-200">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Features */}
              {machine.features && machine.features.length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4 flex items-center">
                    <span className="mr-2">✨</span> Features
                  </h2>
                  <ul className="space-y-2">
                    {machine.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Specifications */}
              {machine.specifications && machine.specifications.length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4 flex items-center">
                    <span className="mr-2">⚙️</span> Specifications
                  </h2>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <dl className="space-y-2">
                      {machine.specifications.map((spec, index) => (
                        <div key={index} className="flex justify-between border-b border-gray-200 pb-2">
                          <dt className="font-semibold text-gray-700">{spec.key}</dt>
                          <dd className="text-gray-600">{spec.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <ImageLightbox
          imageUrl={lightboxImage}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
};

export default MachineDetail;

