import { connectToDatabase } from '../../lib/mongodb';
import Machine from '../../models/Machine';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { slug } = req.query;

  try {
    await connectToDatabase();
    const machine = await Machine.findOne({ slug });
    
    if (!machine) {
      return res.status(404).json({ message: 'Machine not found' });
    }
    
    res.status(200).json(machine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

