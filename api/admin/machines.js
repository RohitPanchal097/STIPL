import { connectToDatabase } from '../../lib/mongodb';
import Machine from '../../models/Machine';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    await connectToDatabase();
    
    // Check if ID is in query (for dynamic routes)
    const { id } = req.query;
    
    // Handle PUT and DELETE if ID exists
    if (id && (req.method === 'PUT' || req.method === 'PATCH')) {
      const machine = await Machine.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true }
      );
      
      if (!machine) {
        return res.status(404).json({ message: 'Machine not found' });
      }
      
      return res.status(200).json(machine);
    }
    
    if (id && req.method === 'DELETE') {
      const machine = await Machine.findById(id);
      if (!machine) {
        return res.status(404).json({ message: 'Machine not found' });
      }

      await Machine.findByIdAndDelete(id);
      return res.status(200).json({ message: 'Machine deleted' });
    }
    
    if (req.method === 'GET') {
      // Get all machines
      const machines = await Machine.find().sort({ dateAdded: -1 });
      return res.status(200).json(machines);
    }
    
    if (req.method === 'POST') {
      // Create new machine
      const slug = req.body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      const machine = new Machine({ ...req.body, slug });
      await machine.save();
      return res.status(201).json(machine);
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Error in api/admin/machines.js:', error);
    res.status(500).json({ message: error.message });
  }
}

