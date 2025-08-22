# 📚 DSA Daily Tracker - Full Stack Application

A comprehensive full-stack web application to track your daily Data Structures and Algorithms (DSA) learning progress. Built with React frontend and Node.js serverless backend, deployed on Vercel with MongoDB Atlas for lifetime free hosting.

## 🚀 Live Demo

🌐 **[View Live Application](https://daily-tracker-sac1hin.vercel.app/)**

## ✨ Features

### 📊 **Daily Progress Tracking**
- **Day Counter**: Automatic day numbering for consistent tracking
- **Topic Focus**: Record the specific DSA topic you studied
- **Problem Statement**: Document the exact problem you solved
- **Learning Notes**: Capture key insights and concepts learned

### 🔄 **Solution Iterations**
- **Step-by-Step Tracking**: Record each iteration of your solution
- **Visual Progress**: See how your approach evolved
- **Algorithm Refinement**: Track improvements in your thinking process

### 🔗 **Solution Links**
- **Multiple Platforms**: Add links to LeetCode, HackerRank, GeeksforGeeks, etc.
- **Custom Labels**: Organize your solution links with descriptive names
- **Easy Access**: Quick navigation to your submitted solutions

### 📋 **Slide Preview**
- **Professional Layout**: Clean, presentation-ready format
- **Tweet Generation**: Auto-generate shareable content for social media
- **Print/PDF Export**: Save your progress as PDF for portfolios
- **Responsive Design**: Perfect viewing on all devices

### 💾 **Persistent Storage**
- **MongoDB Integration**: All data stored in cloud database
- **Real-time Sync**: Automatic synchronization across devices
- **Data Security**: Secure cloud storage with MongoDB Atlas

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern JavaScript library
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript ES6+** - Latest JavaScript features

### Backend
- **Node.js** - Server-side JavaScript runtime
- **Serverless Functions** - Scalable API endpoints on Vercel
- **Express.js** - Web application framework

### Database
- **MongoDB Atlas** - Cloud-hosted NoSQL database
- **Mongoose** - Object modeling for MongoDB

### Deployment
- **Vercel** - Full-stack deployment platform
- **GitHub** - Version control and CI/CD

## 📱 Screenshots

### Main Dashboard
- Clean, modern interface with dual-pane layout
- Form editor on the left, live preview on the right
- Real-time updates as you type

### Slide Preview
- Professional presentation format
- Perfect for screenshots and social sharing
- Print-ready layout for portfolios

### Entries Management
- Tabular view of all your entries
- Quick edit, view, and delete actions
- Sortable by date and topic

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (free)
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/dsa-daily-tracker.git
   cd dsa-daily-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create `.env.local` file:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Run the development server**
   ```bash
   npm start
   ```

5. **Open in browser**
   Navigate to `http://localhost:3000`

## 🌐 Deployment Guide

### One-Click Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/dsa-daily-tracker)

### Manual Deployment

1. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/dsa-daily-tracker.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Connect your GitHub repository
   - Set environment variables
   - Deploy automatically

3. **Set Environment Variables**
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/entries` | Fetch all entries |
| `POST` | `/api/entries` | Create new entry |
| `GET` | `/api/entries/[id]` | Get specific entry |
| `PUT` | `/api/entries/[id]` | Update entry |
| `DELETE` | `/api/entries/[id]` | Delete entry |

### Example API Usage

```javascript
// Create new entry
const response = await fetch('/api/entries', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    day: 1,
    topic: "Binary Search",
    problem: "Find target in sorted array",
    learned: "O(log n) time complexity with divide and conquer",
    links: [{ label: "LeetCode #704", url: "https://leetcode.com/problems/binary-search/" }],
    iterations: ["Linear search O(n)", "Binary search O(log n)"]
  })
});
```

## 📂 Project Structure

```
dsa-daily-tracker/
├── api/                    # Serverless API functions
│   ├── entries/
│   │   ├── index.js       # GET /POST entries
│   │   └── [id].js        # GET/PUT/DELETE specific entry
│   └── lib/
│       ├── mongodb.js     # Database connection
│       └── models/Entry.js # Data schema
├── src/                   # React frontend
│   ├── components/        # React components
│   ├── services/          # API service layer
│   └── App.js            # Main application
├── public/               # Static assets
└── package.json         # Dependencies
```

## 🎯 Data Schema

```javascript
{
  day: Number,           // Day number (required)
  topic: String,         // DSA topic (required)
  problem: String,       // Problem description
  learned: String,       // Key learnings
  links: [{              // Solution links
    label: String,       // Display name
    url: String         // Link URL
  }],
  iterations: [String]   // Solution steps
}
```

## 🔧 Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `vercel dev` - Run Vercel development server

### Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 🎨 Customization

### Tailwind Configuration
Modify `tailwind.config.js` to customize the design:
```javascript
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#your-color",
      }
    }
  }
}
```

### Environment Variables
- `MONGODB_URI` - MongoDB connection string
- `REACT_APP_API_URL` - API base URL (optional)

## 🛡️ Security Features

- **CORS Protection** - Configured for secure cross-origin requests
- **Input Validation** - Server-side validation for all inputs
- **Error Handling** - Comprehensive error management
- **Environment Variables** - Sensitive data protection

## 🚀 Performance

- **Serverless Architecture** - Auto-scaling backend functions
- **CDN Delivery** - Global content delivery via Vercel
- **Optimized Bundle** - Code splitting and lazy loading
- **Database Connection Pooling** - Efficient MongoDB connections

## 📈 Analytics & Monitoring

Track your learning progress with:
- Daily entry counts
- Topic distribution
- Learning streaks
- Problem-solving patterns

## 🎓 Educational Value

Perfect for:
- **Students** learning DSA concepts
- **Job Seekers** preparing for coding interviews
- **Developers** improving problem-solving skills
- **Educators** tracking student progress

## 🌟 Why This Project?

1. **Real Problem Solving** - Addresses actual needs of DSA learners
2. **Modern Tech Stack** - Uses latest web technologies
3. **Production Ready** - Deployed and accessible globally
4. **Open Source** - Community-driven development
5. **Free Forever** - No hidden costs or limitations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

- **Issues**: [GitHub Issues](https://github.com/sac1hin/Daily-Tracker-Slides/issues)
- **Discussions**: [GitHub Discussions](https://github.com/sac1hin/Daily-Tracker-Slides/discussions)
- **Email**: your-email@example.com

## 🎉 Acknowledgments

- [Create React App](https://create-react-app.dev/) - React application setup
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [Vercel](https://vercel.com/) - Deployment platform
- [MongoDB Atlas](https://www.mongodb.com/atlas) - Database hosting

---

**⭐ Star this repository if you found it helpful!**

Made with ❤️ for the DSA learning community