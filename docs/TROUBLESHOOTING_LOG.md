# Troubleshooting Log

This log summarizes the major problems found during development and how they were resolved or mitigated.

## API and Environment

### Invalid Gemini API Key

**Symptom:** Gemini requests returned `API key not valid`.

**Cause:** The `.env` file still contained a placeholder key or the wrong key was selected.

**Resolution:** Replace `GEMINI_API_KEY` with a valid key from Google AI Studio and restart the dev server.

### Gemini High Demand / 503

**Symptom:** Gemini returned `UNAVAILABLE` or high-demand errors.

**Cause:** Temporary model-side availability issue.

**Resolution:** Add fallback handling for keyword search and keep the UI from crashing on a model outage.

### Firebase IAM Friction

**Symptom:** Firebase/Google Cloud showed missing permissions such as `iam.serviceAccounts.list`.

**Cause:** The app was originally tied to a sandbox-managed Google Cloud/Firebase project with limited permissions.

**Resolution:** Remove Firebase from the intended workflow and use direct Google OAuth/Gmail API configuration instead.

## Chrome Extension

### Missing Manifest Icon

**Symptom:** Chrome refused to load the extension because `icon.png` did not exist.

**Cause:** The manifest referenced assets that were never created.

**Resolution:** Remove unused icon/popup references from the manifest.

### CORS and CSP Failures

**Symptom:** The extension button appeared but failed to sync jobs to JobFlow.

**Cause:** Content scripts running on Indeed/LinkedIn are restricted by browser CORS and page Content Security Policy rules.

**Resolution:** Move network posting into an extension background service worker and use message passing from content script to background script.

### No Button on Indeed

**Symptom:** The floating sync button did not appear on some Indeed pages.

**Cause:** Indeed's split-pane, iframe, and dynamic rendering behavior made top-level script injection inconsistent.

**Resolution:** Update match patterns, include iframe support where needed, and require reloading Indeed/LinkedIn tabs after extension updates.

### LinkedIn Access and Direct Scraping Limits

**Symptom:** LinkedIn capture was unreliable or blocked during early attempts.

**Cause:** LinkedIn aggressively limits embedded access, unauthenticated scraping, iframes, and cross-origin browser requests.

**Resolution:** Treat the extension as a user-side capture assistant instead of a server-side scraper. The browser extension reads the page the user is already viewing and sends only the selected job data into JobFlow.

## Resume Tailoring

### Wrong Dates or Old Year

**Symptom:** Gemini assumed the wrong year or modified "Present" roles incorrectly.

**Cause:** The prompt did not provide the current date strongly enough.

**Resolution:** Inject current date/year into the server prompt and tell the model to preserve present roles.

### Hidden URLs

**Symptom:** LinkedIn or portfolio links were converted into Markdown hyperlinks that hid the raw URL.

**Cause:** Markdown conventions encouraged `[Label](url)` formatting.

**Resolution:** Prompt now requires raw visible URLs for printed/PDF resumes.

### Inflated or Robotic Language

**Symptom:** Resume text became too generic, too polished, or sounded AI-generated.

**Cause:** Initial prompts were broad.

**Resolution:** Add strict resume rules: no fabricated metrics, no inflated verbs, no invented enterprise experience, and explicit career-pivot framing.

### Refinement Button Changed Formatting Too Much

**Symptom:** A refinement pass could overcorrect the resume, change casing, or disturb the visual hierarchy.

**Cause:** The refinement prompt was too close to the general AI chat flow and did not strictly preserve formatting.

**Resolution:** Separate the polish/refine action from the conversational refinement area and require standard Markdown structure during resume repair.

## PDF Export

### Browser Print Metadata

**Symptom:** PDF had date/time/URL headers or footers.

**Cause:** Native browser print settings add metadata by default.

**Resolution:** Move away from print-menu-only export and refine PDF generation around the rendered preview.

### Unsupported `oklch` Color Function

**Symptom:** PDF generation failed when parsing modern CSS colors.

**Cause:** The PDF renderer could not parse some Tailwind v4 color output.

**Resolution:** Use PDF-safe styles and standard colors for the exported resume node.

### Section Split Across Pages

**Symptom:** Headings such as technical projects split awkwardly between pages.

**Cause:** PDF export did not respect heading/list page-break behavior.

**Resolution:** Add `break-inside` / `page-break-inside` rules for headings, paragraphs, and list items.

## Gmail and Email Monitor

### Indeed Apply Not Matching the Real Company

**Symptom:** An email from Indeed Apply belonged to a specific company but showed under untracked or another bucket.

**Cause:** The sender was generic, while the real company name appeared only in the message body or snippet.

**Resolution:** Match against decoded body text and snippets, not just sender or subject.

### Workday/ZOLL Missing

**Symptom:** A Workday email for ZOLL was not visible in the ZOLL tab.

**Cause:** Workday sender/subject patterns did not always match the job's stored company name directly.

**Resolution:** Broaden matching inputs and normalize company tokens.

### Deleted or Hidden Emails Reappearing

**Symptom:** Deleted-from-sight emails appeared again after refresh.

**Cause:** Hidden email state was split between components or refreshed by polling.

**Resolution:** Move hidden email ownership to the parent app state and persist it in local storage.

## Dashboard Persistence

### Deleted Jobs Reappearing

**Symptom:** Deleted applications such as old demo companies came back after refresh or reset.

**Cause:** Backend seed data and browser cache could disagree.

**Resolution:** Track deleted job IDs and filter the active dashboard against those tombstones.

### Tailoring Triggered Full Page Reloads

**Symptom:** Clicking resume tailoring appeared to refresh the app and return to the front dashboard.

**Cause:** Vite watched local runtime files such as `jobs_db.json` and `logs_db.json`. When tailoring updated those files, the dev server could trigger a browser reload.

**Resolution:** Configure Vite to ignore local runtime database files and persist the active tab in local storage.

### White Screen During Refactors

**Symptom:** The app temporarily rendered a blank white screen after component changes.

**Cause:** React runtime errors and stale hot-reload state were not surfaced clearly.

**Resolution:** Add an error boundary during the development process and restart the dev server after structural UI changes.

## Development Tooling

### PowerShell `npm.ps1` Blocked

**Symptom:** `npm install` failed because PowerShell script execution was disabled.

**Resolution:** Use `npm.cmd install` and `npm.cmd run dev`, or update PowerShell execution policy for the current user.

### Git Not Recognized

**Symptom:** `git` was not available in PowerShell.

**Resolution:** Install Git for Windows and configure name/email before committing.
