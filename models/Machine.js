import mongoose from 'mongoose';

const machineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['physical', 'pulp', 'package', 'surface', 'environmental'],
    required: true
  },
  productCode: {
    type: String,
    required: true,
    trim: true
  },
  dimensions: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    required: true
  },
  features: [{
    type: String
  }],
  specifications: [{
    key: String,
    value: String
  }],
  image: {
    type: String,
    default: ''
  },
  gallery: [{
    type: String
  }],
  dateAdded: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.models.Machine || mongoose.model('Machine', machineSchema);

