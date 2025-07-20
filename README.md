# � TrendTide - YouTube Analytics & AI Content Creation Platform

A comprehensive AI-powered platform that empowers YouTube creators with advanced tools for thumbnail generation, content creation, competitor analysis, and performance insights.

![TrendTide Banner](https://img.shields.io/badge/TrendTide-YouTube%20Analytics-blue?style=for-the-badge&logo=youtube&logoColor=white)

## ✨ Features

- 🎨 **AI Thumbnail Generator** - Create stunning, click-worthy thumbnails with advanced AI
- 🔍 **Thumbnail Search** - Analyze competitor thumbnails and discover trending patterns
- ✍️ **AI Content Generator** - Generate optimized titles, descriptions, and video scripts
- 📊 **Outlier Analysis** - Identify breakthrough opportunities and viral content patterns
- 🔐 **Multi-tier Subscription** - Free, Pro, and Business plans with feature gating
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🌙 **Dark/Light Mode** - Complete theme switching support

## 🛠️ Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Authentication:** Clerk
- **Database:** Neon PostgreSQL with Drizzle ORM
- **Styling:** Tailwind CSS with custom components
- **Animations:** Framer Motion
- **Background Jobs:** Inngest
- **Image Processing:** ImageKit
- **AI APIs:** OpenRouter, Runware, Hugging Face
- **Deployment:** Vercel

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Git installed
- A Vercel account (for deployment)

### 1. Clone the Repository

```bash
git clone https://github.com/Pawandasila/youtube-analytics.git
cd youtube-analytics
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Copy the example environment file:

```bash
cp .env.example .env
```

### 4. Configure Environment Variables

You'll need to obtain API keys from various services. Here's where to get each one:

#### 🗄️ Database Configuration

**Neon Database (PostgreSQL)**
- Go to [Neon Console](https://console.neon.tech/)
- Create a new project
- Copy the connection string
- Add to `.env`:
```env
NEXT_PUBLIC_NEON_DB_CONNECTION_STRING=postgresql://username:password@host/database
```

#### 🔐 Authentication

**Clerk (Authentication)**
- Go to [Clerk Dashboard](https://clerk.com/)
- Create a new application
- Get your keys from the API Keys section
- Add to `.env`:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key
```

#### 🖼️ Image Processing

**ImageKit (Image CDN & Processing)**
- Go to [ImageKit Dashboard](https://imagekit.io/)
- Create an account
- Get your keys from Settings → API Keys
- Add to `.env`:
```env
IMAGEKIT_PUBLIC_KEY=public_your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=private_your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
```

#### 🤖 AI Services

**OpenRouter (AI Content Generation)**
- Go to [OpenRouter](https://openrouter.ai/)
- Create an account and get API key
- Add to `.env`:
```env
OPENROUTER_API_KEY=sk-or-v1-your_openrouter_api_key
```

**Runware (AI Image Generation)**
- Go to [Runware](https://runware.ai/)
- Create an account and get API key
- Add to `.env`:
```env
RUNWARE_API_KEY=your_runware_api_key
```

**Hugging Face (AI Models)**
- Go to [Hugging Face](https://huggingface.co/)
- Create an account
- Generate an API token in Settings
- Add to `.env`:
```env
HUGGINGFACE_API_KEY=hf_your_huggingface_api_key
```

#### ⚡ Background Jobs

**Inngest (Background Processing)**
- Go to [Inngest](https://app.inngest.com/)
- Create an account and app
- Get your keys from Settings → Keys
- Add to `.env`:
```env
NEXT_PUBLIC_INNGEST_SIGNING_KEY=signkey-prod-your_inngest_signing_key
INNGEST_EVENT_KEY=evt_your_inngest_event_key
NEXT_PUBLIC_INNGEST_SERVER_URL=https://api.inngest.com
```

#### 📺 YouTube Integration

**YouTube Data API**
- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Create a new project or select existing
- Enable YouTube Data API v3
- Create credentials (API Key)
- Add to `.env`:
```env
YOUTUBE_API_KEY=your_youtube_api_key
```

#### 🕷️ Web Scraping

**BrightData (Web Scraping)**
- Go to [BrightData](https://brightdata.com/)
- Create an account
- Get your API key
- Add to `.env`:
```env
BRIGHTDATA_API_KEY=your_brightdata_api_key
```

### 5. Database Setup

Run the database migrations:

```bash
npm run db:push
```

### 6. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application running!

## 📁 Project Structure

```
youtube-analytics/
├── app/                          # Next.js app directory
│   ├── (auth)/                   # Authentication pages
│   ├── (routes)/                 # Protected routes
│   │   ├── dashboard/            # User dashboard
│   │   ├── thumbnail-generator/  # AI thumbnail generation
│   │   ├── thumbnail-search/     # Thumbnail analysis
│   │   ├── ai-content-generator/ # Content generation
│   │   ├── outlier/              # Outlier analysis
│   │   └── profile/              # User profile
│   ├── api/                      # API routes
│   │   ├── generate-thumbnail/   # Thumbnail generation API
│   │   ├── ai-content-generator/ # Content generation API
│   │   ├── thumbnail-search/     # Search API
│   │   ├── outlier/              # Outlier analysis API
│   │   ├── user/                 # User management API
│   │   └── inngest/              # Inngest webhook
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
├── components/                   # Reusable components
│   ├── ui/                       # Base UI components
│   ├── landing/                  # Landing page components
│   └── _components/              # Shared components
├── configs/                      # Configuration files
│   ├── db.tsx                    # Database configuration
│   └── schema.ts                 # Database schema
├── inngest/                      # Background jobs
│   ├── client.ts                 # Inngest client
│   └── functions.ts              # Job functions
├── hooks/                        # Custom React hooks
├── lib/                          # Utility functions
├── public/                       # Static assets
└── services/                     # External API services
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push database schema
- `npm run db:studio` - Open Drizzle Studio

## 🚀 Deployment

### Deploy to Vercel

1. Connect your GitHub repository to [Vercel](https://vercel.com/)
2. Add all environment variables in Vercel dashboard
3. Deploy!

### Environment Variables for Production

Make sure to add all the environment variables from your `.env` file to your Vercel project settings:

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add each variable from your `.env` file

### Configure Inngest for Production

1. In your Inngest dashboard, add your production URL:
   ```
   https://your-app-name.vercel.app
   ```
2. Make sure your signing key and event key are set in Vercel environment variables

## 🎯 Usage

### For Content Creators

1. **Sign up** with Clerk authentication
2. **Choose your plan** (Free, Pro, or Business)
3. **Generate thumbnails** using AI with custom prompts
4. **Search competitors** to find trending thumbnail patterns
5. **Create content** with AI-generated titles and descriptions
6. **Analyze performance** to identify viral content opportunities

### API Usage

The platform provides several API endpoints:

- `POST /api/generate-thumbnail` - Generate AI thumbnails
- `POST /api/ai-content-generator` - Generate content
- `GET /api/thumbnail-search` - Search thumbnails
- `GET /api/outlier` - Get outlier analysis

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit: `git commit -m 'Add some feature'`
5. Push: `git push origin feature-name`
6. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [Issues](https://github.com/Pawandasila/youtube-analytics/issues) section
2. Create a new issue with detailed information
3. Contact support at [your-email@example.com]

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Clerk](https://clerk.com/) for authentication
- [Neon](https://neon.tech/) for the database
- [Inngest](https://inngest.com/) for background jobs
- [Vercel](https://vercel.com/) for deployment
- All the AI service providers for making this possible

---

**Made with ❤️ by [Pawan Dasila](https://github.com/Pawandasila)**

⭐ If you found this project helpful, please give it a star!

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
