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

  const { id } = req.query;

  try {
    await connectToDatabase();

    switch (req.method) {
      case 'GET':
        const entry = await Entry.findById(id);
        if (!entry) {
          return res.status(404).json({ message: 'Entry not found' });
        }
        return res.status(200).json(entry);

      case 'PUT':
        const { day, topic, problem, learned, links, iterations } = req.body;
        
        const updatedEntry = await Entry.findByIdAndUpdate(
          id,
          {
            day,
            topic,
            problem,
            learned,
            links,
            iterations
          },
          { new: true, runValidators: true }
        );

        if (!updatedEntry) {
          return res.status(404).json({ message: 'Entry not found' });
        }

        return res.status(200).json(updatedEntry);

      case 'DELETE':
        const deletedEntry = await Entry.findByIdAndDelete(id);
        
        if (!deletedEntry) {
          return res.status(404).json({ message: 'Entry not found' });
        }

        return res.status(200).json({ message: 'Entry deleted successfully' });

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
