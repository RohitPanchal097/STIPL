import { connectToDatabase } from '../../../lib/mongodb';
import Machine from '../../../models/Machine';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { id } = req.query;

  try {
    await connectToDatabase();

    if (req.method === 'PUT') {
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

    if (req.method === 'DELETE') {
      const machine = await Machine.findById(id);
      if (!machine) {
        return res.status(404).json({ message: 'Machine not found' });
      }

      await Machine.findByIdAndDelete(id);
      return res.status(200).json({ message: 'Machine deleted' });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

