# Development Journey

This file documents the project from the original AI Studio prototype through the cleaned JobFlow application. It is written for a public GitHub repository, so personal data, API keys, and private email contents are intentionally excluded.

## Original Product Goal

The initial goal was to build a job-search command center:

1. Browse Indeed or LinkedIn.
2. Capture a job title, company, URL, date, and job description.
3. Store the role in a spreadsheet-style dashboard.
4. Send the user's base resume and the selected job description to Gemini.
5. Produce a brutally honest critique and a tailored resume.
6. Save the tailored resume as a clean PDF.
7. Keep a manual review step before applying.
8. Connect Gmail so job replies can be grouped under the correct application.

## Timeline Summary

### 1. AI Studio Prototype

The first build came out as a broad prototype with a dashboard, resume tailor, submission review panel, email monitor, and Chrome extension setup screen. It proved the workflow idea, but it was cluttered and included generic AI Studio branding and placeholder language.

Key cleanup:

- Removed the AI Studio banner from the public README.
- Replaced generic documentation with project-specific GitHub docs.
- Moved toward a more desktop-style layout focused on stability and clarity.

### 2. Job Capture and Extension Work

The Chrome extension went through several failed iterations before becoming usable.

Problems encountered:

- Chrome refused to load a manifest that referenced missing icon assets.
- Direct fetch calls from Indeed/LinkedIn pages hit CORS and Content Security Policy restrictions.
- Indeed's split-pane and iframe behavior prevented content scripts from appearing consistently.
- Extension scripts became stale until Indeed/LinkedIn tabs were refreshed after reloading the extension.
- Some captures landed in the wrong AI Studio or shared app environment.

Fixes and lessons:

- Removed unused icon and popup references from the manifest.
- Moved network posting into a background service worker.
- Added broader URL match patterns for Indeed and LinkedIn.
- Added `all_frames` support where needed.
- Added clearer setup/debugging instructions.
- Added local API persistence so captures can live in `jobs_db.json`.

### 3. Resume Tailoring and Prompt Control

The resume workflow evolved from a single rough prompt into a stricter, career-pivot-focused tailoring system.

Problems encountered:

- Gemini occasionally used outdated dates or assumed the wrong current year.
- Some outputs hid LinkedIn/GitHub behind Markdown links instead of showing raw URLs.
- Some outputs invented or over-polished experience.
- Resume formatting sometimes collapsed into plain text or old-school layout.
- Refinement requests could mix commentary into the resume body.

Fixes and lessons:

- Injected the current date and year into the server prompt.
- Added strict contact integrity rules.
- Added visible raw URL rules.
- Added a second-draft polish prompt focused on grounded, human wording.
- Added refinement controls so the user can ask questions or request changes without losing the draft.
- Extracted prompt text into a reusable module during cleanup.

### 4. PDF Export

PDF generation took several attempts.

Problems encountered:

- Browser print output included unwanted timestamps and URLs.
- Some generated files looked like plain notepad text.
- `html2pdf.js` initially failed on unsupported Tailwind color functions such as `oklch`.
- Section headings could split across pages.

Fixes and lessons:

- Styled the resume preview specifically for PDF export.
- Added page-break rules to avoid orphaned headings and split bullet items.
- Adjusted PDF export to use the rendered preview rather than raw text.
- Kept Markdown structure strict so headings and bullets render predictably.

### 5. Gmail Monitoring

Email tracking was the hardest part because job portals often hide the real company name behind generic senders.

Problems encountered:

- Emails from `indeedapply` did not match the company in the sender field.
- Workday emails for companies like ZOLL could be missed if the match logic looked only at sender or subject.
- Some Gmail messages had relevant text only inside HTML MIME parts.
- Some messages landed in the wrong company bucket.
- Uncategorized and global feed views became noisy.
- Hidden or deleted emails could reappear after refresh.

Fixes and lessons:

- Matched email sender, subject, snippet, plain text body, and decoded HTML body.
- Added normalization for non-breaking spaces and HTML entities.
- Centralized matching logic in `src/lib/emailMatcher.ts`.
- Added hide/delete-from-sight behavior backed by local storage.
- Added a Response Tracker feed and trash view.
- Added controls for active fetch/delete mode versus stagnant observer mode.

### 6. Persistence and Deleted Jobs

The dashboard originally reloaded old demo jobs after refreshes or server restarts.

Problems encountered:

- Local JSON files could be reseeded.
- Browser localStorage and server JSON files could disagree.
- Deleted applications could reappear when one layer forgot the deletion.

Fixes and lessons:

- Added deleted-job tombstones.
- Filtered active jobs against deleted IDs.
- Preserved active/deleted lists separately.
- Added safer JSON writes using temporary file replacement during cleanup.

### 7. Code Cleanup

Later cleanup focused on making the code more maintainable.

Changes made:

- Backed up the experimental CrewAI sidecar under `.backups`.
- Removed the sidecar from the active app to reduce install/runtime complexity.
- Centralized JSON storage helpers.
- Added local storage helpers.
- Extracted Gmail message parsing helpers.
- Centralized email matching.
- Extracted resume prompts and PDF export helper.
- Made Vite ignore local runtime database files so dashboard writes do not trigger full reloads.

### 8. Beta Prompt and Portfolio Controls

The next beta pass added user-facing controls for the AI parts of the app.

Changes made:

- Added editable prompt panels for resume tailoring, critique wording, second-draft polish, and keyword search.
- Added a GitHub Profiles tab for storing multiple portfolio URLs with notes.
- Updated the resume tailoring request so Gemini can compare those GitHub profiles against a job description and choose the most relevant one for that application.
- Added the selected GitHub URL and reasoning back into the tailored resume view for review.

## Current State

The current application is a React/Express local-first tool with Gemini resume tailoring, prompt customization, multi-GitHub portfolio selection, Gmail monitoring, a dashboard pipeline, and local JSON persistence. It is still a work in progress, but it now has a cleaner public story and a clearer path for future improvements.
