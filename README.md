# SkillSpin - Skill Enhancement & Role Targeting Platform

<div align="center">
  <h3>🎯 Track Skills • Set Goals • Get Personalized Recommendations</h3>
</div>

A modern web application for tracking your skills, setting career goals, and receiving personalized learning recommendations.

## ✨ Features

- **Authentication Flow**: Beautiful login and signup pages with Google OAuth support
- **Profile Creation**: 4-step wizard to collect:
  - Personal information (role, experience, industry)
  - Current skills with proficiency levels
  - Target role and skills to learn
  - Learning preferences and goals
- **Interactive Dashboard**: Comprehensive view with:
  - Stats overview (total skills, avg proficiency, targets, timeline)
  - Skills visualization with color-coded proficiency bars
  - Target role progress tracking
  - Skill gap analysis
  - Personalized learning recommendations
  - Quick action buttons

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aryanyyadav787-design/skillspin.git
   cd skillspin
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (Optional)
   ```bash
   cp .env.example .env.local
   ```
   
   > **Note**: The `.env.local` file is optional. The app works without it, but if you want to use Gemini AI features in the future, add your API key to `.env.local`

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:3000`

## 📦 Build for Production

```bash
npm run build
npm run preview
```

## 🛠️ Tech Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Vanilla CSS with Tailwind-inspired classes
- **Icons**: Lucide React
- **Charts**: Recharts (for future analytics)

## 📁 Project Structure

```
skillspin/
├── components/
│   ├── LandingPage.tsx      # Landing page with hero section
│   ├── AuthPage.tsx          # Login/Signup authentication
│   ├── ProfileSetup.tsx      # 4-step profile wizard
│   └── Dashboard.tsx         # Main dashboard after login
├── services/
│   └── gemini.ts             # Gemini AI service (optional)
├── App.tsx                   # Main app with routing logic
├── index.tsx                 # App entry point
├── index.html                # HTML template
├── vite.config.ts            # Vite configuration
└── package.json              # Dependencies
```

## 🎯 How to Use

1. **Sign Up**: Create an account on the landing page
2. **Complete Profile**: Fill out the 4-step wizard:
   - Enter your personal information
   - Add your current skills with proficiency levels
   - Define your target role and skills to learn
   - Set your learning preferences
3. **View Dashboard**: See your personalized learning journey
4. **Track Progress**: Monitor your skill development and gaps
5. **Get Recommendations**: Receive AI-powered learning suggestions

## 🐛 Troubleshooting

### App won't start?
- Make sure you've run `npm install` to install all dependencies
- Check that you're using Node.js v16 or higher: `node --version`
- Try deleting `node_modules` and `package-lock.json`, then run `npm install` again

### Build errors?
- Clear the build cache: `rm -rf dist`
- Reinstall dependencies: `npm install`

### Port already in use?
- The default port is 3000. If it's in use, Vite will automatically try the next available port
- You can specify a different port in `vite.config.ts`

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Developer

Created by [Aryan Yadav](https://github.com/aryanyyadav787-design)

## 🔗 Links

- **GitHub Repository**: https://github.com/aryanyyadav787-design/skillspin
- **Live Demo**: [Coming Soon]

---

**Note**: This is a frontend application. For full functionality, you may want to integrate a backend for data persistence, user authentication, and real AI-powered recommendations.
