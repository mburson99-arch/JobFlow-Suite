# JobFlow Suite

A local-first career management platform that streamlines the entire job application workflow—from capturing opportunities to tailoring resumes with AI to tracking email responses—all from a single dashboard.

## Overview

JobFlow Suite is a full-stack TypeScript application designed for job seekers who want complete control over their application pipeline. Built with privacy-first principles, all data lives locally on your machine while leveraging powerful APIs like Google Gemini for resume tailoring and Gmail for response tracking. Whether you're a career changer pivoting into tech or an experienced professional managing dozens of applications, JobFlow Suite provides the tools to stay organized, craft compelling resumes, and never miss a follow-up.

## Key Features

- **📊 Job Application Dashboard**: Spreadsheet-style interface to track applications with status management, match scores, and quick filters
- **🤖 AI-Powered Resume Tailoring**: Integrates with Google Gemini to critique your resume and generate tailored versions optimized for specific job descriptions
- **📧 Gmail Integration**: Automatically matches incoming emails from recruiters and companies to your applications, keeping responses organized
- **🌐 Browser Extension Support**: Capture job postings from Indeed and LinkedIn directly into your local dashboard
- **📄 PDF Export**: Generate clean, formatted PDF resumes from your tailored content
- **🔗 Smart GitHub Profile Selection**: Store multiple portfolio URLs and let AI select the most relevant one per application
- **🎯 Brutally Honest Critiques**: Get frank, actionable feedback on how well your resume matches each job
- **📝 Customizable Prompts**: Override AI prompts for tailoring, critique, and keyword search to match your preferences
- **🔒 Privacy-First Architecture**: All data stored in local JSON files—no external database, complete ownership
- **🎨 Modern UI**: Clean, responsive interface built with React 19 and Tailwind CSS

## Tech Stack

### Frontend
- **React 19** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tooling and dev server
- **Tailwind CSS 4** - Utility-first styling
- **Lucide React** - Icon library
- **React Markdown** - Markdown rendering

### Backend
- **Node.js** - Runtime environment
- **Express** - Web server framework
- **TypeScript** - Type-safe server code

### AI & APIs
- **Google Gemini 2.5 Flash** - AI resume tailoring and critique via `@google/genai`
- **Gmail API** - Email tracking and matching with OAuth 2.0
- **Google OAuth** - Secure authentication

### Data Storage
- **Local JSON Files** - No database required, complete portability
- **File-based state management** - Jobs, profiles, emails, and logs

### Development Tools
- **tsx** - TypeScript execution for development
- **esbuild** - Fast JavaScript bundler
- **html2pdf.js** - Client-side PDF generation

## Architecture Overview

JobFlow Suite follows a client-server architecture where both components run locally on your machine:

```
┌─────────────────────────────────────────────────────────────┐
│                     Browser (localhost:3000)                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Dashboard   │  │Resume Tailor │  │Email Monitor │     │
│  │  Component   │  │  Component   │  │  Component   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│         │                  │                  │             │
│         └──────────────────┴──────────────────┘             │
│                           │                                  │
│                    React App (Vite)                         │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            │ HTTP/REST API
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                   Express Server (Node.js)                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  REST API    │  │ Gemini API   │  │  Gmail API   │     │
│  │  Endpoints   │  │  Integration │  │  Integration │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│         │                  │                  │             │
│         └──────────────────┴──────────────────┘             │
│                           │                                  │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            │ File I/O
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                    Local JSON Storage                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ jobs_db.json │  │profile_db.json│ │emails_db.json│     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### How Components Connect

1. **Desktop Dashboard** → The React frontend runs in your browser, communicating with the Express server via REST APIs at `localhost:3000`

2. **Chrome Extension** → A browser extension (setup guide included) captures job details from Indeed/LinkedIn and POSTs them to the local API endpoint

3. **Gmail Integration** → After OAuth authentication, the server fetches emails via Gmail API and matches them to tracked applications using intelligent heuristics (sender, subject, company name)

4. **AI Resume Tailoring** → When you tailor a resume, the server sends your base resume and job description to Google Gemini, which returns a critique and tailored version following strict formatting rules

5. **Data Persistence** → All application state (jobs, profiles, emails, logs) is stored in local JSON files, making backups as simple as copying the project folder

## Installation and Setup

### Prerequisites

- **Node.js 18+** ([download here](https://nodejs.org/))
- **Google Gemini API Key** ([get one free from AI Studio](https://aistudio.google.com/app/apikey))
- **Google OAuth Client ID** (optional, for Gmail integration - no Firebase required)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/mburson99-arch/JobFlow-Suite.git
   cd JobFlow-Suite
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your API keys:
   ```env
   GEMINI_API_KEY="your-gemini-api-key-here"
   GOOGLE_CLIENT_ID="your-oauth-client-id.apps.googleusercontent.com"
   APP_URL="http://localhost:3000"
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Setting Up Gmail Integration (Optional)

To enable email tracking:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Gmail API
4. Create OAuth 2.0 credentials (Web application type)
5. Add `http://localhost:3000` as an authorized JavaScript origin
6. Copy the Client ID to your `.env` file

For detailed setup instructions, see [`LOCAL-SETUP.md`](LOCAL-SETUP.md).

## Screenshots

> **Note**: Screenshots containing personal information are not included in this public repository for privacy reasons. To see the application in action, follow the installation instructions above to run it locally.

When running locally, you'll see:
- A clean dashboard with job cards showing status, company, and match scores
- A resume tailor interface with side-by-side comparison
- An email monitor that groups responses by application
- A configuration panel for managing your profile and API keys

## Development Notes

This project was built as a learning exercise using an AI-assisted workflow with **Cursor IDE** and **Claude Sonnet**. The development process intentionally documents the messy middle of building a real tool:

### What Worked
- Iterative prompt engineering to get Gemini to generate honest, well-formatted resumes
- Local-first architecture with JSON storage (simple, portable, no database overhead)
- Modular React components with TypeScript for type safety
- Express server handling both API endpoints and Vite dev middleware

### What Failed (And How It Was Fixed)
- **Chrome Extension CORS Issues**: Direct fetching from Indeed/LinkedIn failed due to content security policies. Solution: Background service worker with message passing
- **Gmail Matching False Positives**: Early versions matched too broadly. Solution: Multi-factor scoring using sender, subject, company name, and email body content
- **AI Resume Drift**: Gemini initially generated generic corporate jargon and hid URLs in Markdown links. Solution: Strict prompt rules enforcing visible URLs, modern dates, and honest language
- **PDF Export Inconsistencies**: Browser print and early html2pdf attempts added timestamps or broke formatting. Solution: Refined CSS and page-break rules
- **Firebase Complexity**: Original OAuth flow used Firebase, adding unnecessary complexity. Solution: Removed Firebase entirely, switched to direct Google OAuth with simpler token management

The full development journey, including dead ends and pivots, is documented in [`docs/DEVELOPMENT_JOURNEY.md`](docs/DEVELOPMENT_JOURNEY.md).

### Why AI-Assisted?

This project demonstrates what's possible when a developer collaborates with AI tools:
- **Rapid prototyping**: Core features built in days instead of weeks
- **Learning by building**: Explored unfamiliar APIs (Gmail, Gemini) through iterative refinement
- **Documentation as development**: Prompts served as spec documents, ensuring clear intent
- **Real-world complexity**: Tackled actual problems (CORS, OAuth, email parsing) rather than toy examples

The goal wasn't to have AI write perfect code, but to use it as a force multiplier for exploration, debugging, and iteration.

## Project Structure

```
JobFlow-Suite/
├── src/
│   ├── components/       # React UI components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions (Gmail, email matching, prompts)
│   ├── server/          # Server-side storage utilities
│   ├── types/           # TypeScript type definitions
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── docs/                # Project documentation
├── server.ts            # Express server with API endpoints
├── package.json         # Node.js dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite build configuration
├── .env.example         # Environment variable template
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## Roadmap

Future improvements planned for JobFlow Suite:

### High Priority
- **Prompt Version History**: Save and manage multiple prompt presets for tailoring
- **Enhanced Gmail Matching**: Debug panel showing why each email matched (or didn't match) a job
- **Manual Email Reassignment**: Drag-and-drop emails to correct applications
- **Packaged Desktop Build**: Electron wrapper for true offline desktop experience
- **Chrome Extension Improvements**: One-click capture with better LinkedIn parsing

### Medium Priority
- **Cover Letter Generation**: AI-powered cover letters tailored to each application
- **Interview Prep Assistant**: Generate common interview questions based on job descriptions
- **Application Analytics**: Charts showing application rate, response rate, and success metrics
- **Export to ATS Formats**: Direct export to Workday, Greenhouse, Lever formats
- **Job Search Assistant**: Gemini-powered keyword and boolean search string generator

### Low Priority
- **Mobile Companion**: Read-only mobile view for checking application status
- **Backup/Restore UI**: In-app backup management instead of manual file copying
- **Multi-Profile Support**: Separate profiles for different career tracks
- **Dark Mode**: Theme toggle for UI preferences

See [`docs/ROADMAP.md`](docs/ROADMAP.md) for detailed feature specifications and timeline estimates.

## Contributing

This is a personal portfolio project, but suggestions and bug reports are welcome! If you find an issue or have an idea:

1. Check the [Issues](https://github.com/mburson99-arch/JobFlow-Suite/issues) page
2. Open a new issue with a clear description
3. For feature requests, explain the use case and why it would be valuable

Pull requests are accepted for bug fixes and documentation improvements.

## Security & Privacy

- **API Keys**: Never commit `.env` files. All sensitive credentials should remain local
- **Personal Data**: Database files (`*_db.json`) are gitignored by default
- **Gmail Permissions**: OAuth tokens are stored in browser localStorage, never sent to external servers
- **Local-Only**: This app runs entirely on your machine—no data leaves your computer except API calls to Google (Gemini/Gmail)

If you plan to deploy this publicly or share it, review the code for any hardcoded credentials.

## License

MIT License

Copyright (c) 2026 Michael Burson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

**Built with curiosity, caffeine, and Claude** ☕🤖
