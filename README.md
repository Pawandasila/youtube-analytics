# 📊 TrendTide - YouTube Analytics & AI Tools

A comprehensive YouTube analytics platform powered by AI, designed to help content creators optimize their videos, generate stunning thumbnails, and analyze performance metrics.

![TrendTide Banner](https://img.shields.io/badge/TrendTide-YouTube%20Analytics-blue?style=for-the-badge&logo=youtube&logoColor=white)

## ✨ Features

### 🎨 AI-Powered Tools
- **AI Thumbnail Generator** - Create eye-catching thumbnails with advanced AI algorithms
- **AI Content Generator** - Generate engaging video scripts, titles, and descriptions
- **AI Thumbnail Search** - Discover trending thumbnails and analyze successful patterns

### 📈 Analytics & Optimization
- **Outlier Analysis** - Identify breakthrough content opportunities
- **Keywords Research** - Find the best keywords to rank higher
- **Video Optimization** - Optimize videos for maximum engagement

### 🎯 Smart Features
- **Brand Consistency** - Maintain your brand identity across all thumbnails
- **Custom Templates** - Choose from hundreds of professionally designed templates
- **Instant Export** - Download thumbnails in multiple formats and resolutions
- **Performance Tracking** - Monitor your video analytics and growth

## 🚀 Tech Stack

### Frontend
- **Next.js 15.2.3** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Shadcn/ui** - Modern UI components
- **Lucide React** - Beautiful icons

### Backend & Database
- **Neon Database** - Serverless PostgreSQL
- **Drizzle ORM** - Type-safe database operations
- **Inngest** - Background job processing

### Authentication & Styling
- **Clerk** - Complete authentication solution
- **next-themes** - Dark/light mode support
- **GSAP** - Advanced animations
- **Lottie React** - Animated illustrations

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 📁 Project Structure

```
app/
├── (auth)/                    # Authentication pages
│   ├── sign-in/
│   └── sign-up/
├── (routes)/                  # Protected routes
│   └── dashboard/
│       ├── _components/       # Dashboard components
│       │   ├── WelcomeBanner.tsx
│       │   └── FeatureList.tsx
│       └── page.tsx
├── api/                       # API routes
│   ├── generate-thumbnail/
│   └── user/
├── _components/               # Global components
│   ├── AppHeader.tsx
│   └── AppSidebar.tsx
├── globals.css
├── layout.tsx
├── page.tsx                   # Landing page
└── provider.tsx

components/
└── ui/                        # UI components
    ├── button.tsx
    ├── dialog.tsx
    ├── input.tsx
    ├── textarea.tsx
    └── ...

configs/
├── db.tsx                     # Database configuration
└── schema.ts                  # Database schema
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/Pawandasila/youtube-analytics.git
cd youtube-analytics
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="your_neon_database_url"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"

# Inngest
INNGEST_EVENT_KEY="your_inngest_event_key"
INNGEST_SIGNING_KEY="your_inngest_signing_key"

# AI API Keys (for future implementation)
OPENAI_API_KEY="your_openai_api_key"
```

### 4. Database Setup
```bash
# Push database schema
npm run db:push

# Generate migrations (if needed)
npm run db:generate
```

### 5. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📋 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:push      # Push database schema
npm run db:generate  # Generate database migrations
```

## 🎯 Usage

### Getting Started
1. **Sign Up/Sign In** - Create an account or log in with existing credentials
2. **Dashboard** - Access your personalized dashboard with AI tools
3. **Generate Thumbnails** - Use the AI thumbnail generator with custom inputs
4. **Analyze Performance** - Track your video metrics and optimization suggestions

### AI Thumbnail Generator
1. Click "Start Creating Now" on the thumbnail generator page
2. Enter your video title or description
3. Optionally upload reference images or face photos
4. Click "Generate Thumbnail" to create AI-powered designs
5. Download your professional thumbnails

## 🚦 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Environment Variables for Production
Make sure to add all environment variables in your deployment platform:
- Database URLs
- API keys
- Authentication secrets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Vercel** - For hosting and deployment platform
- **Clerk** - For seamless authentication
- **Shadcn/ui** - For beautiful UI components
- **Tailwind CSS** - For utility-first styling

## 📞 Support

For support, email [your-email@example.com] or join our Discord community.

## 🔮 Roadmap

- [ ] Advanced AI models for thumbnail generation
- [ ] Video analytics dashboard
- [ ] Competitor analysis tools
- [ ] Bulk thumbnail generation
- [ ] API for third-party integrations
- [ ] Mobile app development

---

**Made with ❤️ for YouTube Creators**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Pawandasila/youtube-analytics)
