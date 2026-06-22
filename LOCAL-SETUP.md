# JobFlow Local Setup

JobFlow runs as a local React and Express app. Your job pipeline, profile, email tracking state, and logs are stored in local JSON files in the project folder.

## Prerequisites

- Node.js 18 or newer
- A Gemini API key for resume tailoring
- Optional: a Google OAuth Web Client ID for Gmail sync

## Windows

From PowerShell:

```powershell
cd "C:\Users\Hubby\Desktop\Job Tracker and resume tailor"
npm.cmd install
npm.cmd run dev
```

Open:

```text
http://localhost:3000
```

If PowerShell blocks `npm`, keep using `npm.cmd`.

## macOS or Linux

```bash
cd /path/to/jobflow-resume-tailor
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Environment Variables

Create or edit `.env` in the project root:

```env
GEMINI_API_KEY="your_gemini_api_key"
GOOGLE_CLIENT_ID="your_google_oauth_web_client_id.apps.googleusercontent.com"
APP_URL="http://localhost:3000"
```

Never commit `.env` to GitHub.

## Local Data Files

The app uses local JSON files:

- `jobs_db.json`: job applications and tailored resume metadata
- `profile_db.json`: base profile and resume text
- `emails_db.json`: simulated/local email records
- `logs_db.json`: app activity logs
- `deleted_jobs_db.json`: deleted job tombstones

To back up the app, copy the whole project folder or copy the JSON files above.
