import { connectToDatabase } from '../../lib/mongodb';
import Machine from '../../models/Machine';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    await connectToDatabase();
    
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
    res.status(500).json({ message: error.message });
  }
}

