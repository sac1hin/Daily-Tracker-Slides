const { connectToDatabase } = require('../lib/mongodb');
const Entry = require('../lib/models/Entry');

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await connectToDatabase();

    switch (req.method) {
      case 'GET':
        const entries = await Entry.find().sort({ createdAt: -1 });
        return res.status(200).json(entries);

      case 'POST':
        const { day, topic, problem, learned, links, iterations } = req.body;

        if (!day || !topic) {
          return res.status(400).json({ message: 'Day and topic are required' });
        }

        const entry = new Entry({
          day,
          topic,
          problem,
          learned,
          links,
          iterations
        });

        const createdEntry = await entry.save();
        return res.status(201).json(createdEntry);

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
