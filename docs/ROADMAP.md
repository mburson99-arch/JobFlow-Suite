# Future Updates

This roadmap captures practical improvements that would make JobFlow more stable, easier to package, and more useful as a long-term job-search tool.

## High Priority

### 1. Prompt Version History

The beta prompt editor now allows user-edited Gemini prompts for tailoring, critique, polishing, and keyword search. A future version should save named prompt presets, show last-used timestamps, and allow rollback to earlier prompt versions.

### 2. GitHub Profile Scoring Audit

The beta GitHub profile selector now lets the user store multiple GitHub portfolio URLs with notes. A future version should show exactly why Gemini selected one GitHub over another for each job:

- matched project keywords
- matched tools
- job-description signals
- rejected alternatives
- final selected URL

### 3. Gmail Matching Review Tools

Add a debug panel for each email showing why it matched a job:

- matched sender tokens
- matched subject tokens
- matched snippet/body tokens
- final score
- selected job bucket

This would make issues like Indeed Apply or Workday routing much easier to diagnose.

### 4. Manual Email Reassignment

Allow the user to move an email from Uncategorized or a wrong company tab into the correct job application manually. Store that override so future messages in the same thread stay with the chosen job.

### 5. Safer Profile Import

Add a profile import flow that reads a resume text file or PDF, extracts contact fields, and asks the user to confirm:

- name
- email
- phone
- portfolio
- LinkedIn
- base resume text

The app should never guess contact details without confirmation.

### 6. Packaged Desktop Build

Move beyond launcher scripts and package JobFlow as a real Windows desktop application using Electron or Tauri.

Goals:

- double-click executable
- local data folder
- first-run setup screen
- automatic browser opening or embedded webview
- no manual terminal use

## Medium Priority

### 7. Chrome Extension ZIP Export

Generate a ready-to-load Chrome extension ZIP from inside the app so the user does not need to copy/paste `manifest.json`, `background.js`, and `content.js` manually.

### 8. Resume Version History

Store every tailored draft by job:

- first Gemini draft
- human-polished draft
- manual edits
- exported PDF date

This would make it easy to compare what changed and roll back.

### 9. Email Status Automation

Automatically suggest job status changes from Gmail:

- application received
- rejected
- interview requested
- next step
- offer

The app should suggest the change, but the user should approve it.

### 10. Cleaner GitHub Export Assets

Keep the GitHub Export tab synced with actual docs in `/docs`:

- README
- troubleshooting log
- roadmap
- screenshot guide
- project story

## Long-Term Ideas

### 11. Multi-Mailbox Support

Support Outlook, Yahoo, and IMAP inboxes in addition to Gmail.

### 12. Search Strategy Assistant

Expand the Gemini keyword assistant into a role discovery tool that suggests:

- alternate job titles
- adjacent entry-level IT roles
- boolean search strings
- companies to target
- skill gaps to study

### 13. Application Analytics

Add weekly stats:

- applications captured
- tailored resumes generated
- submitted applications
- responses received
- response rate
- rejection/interview ratio

### 14. Test Coverage

Add focused tests for:

- email matching
- job deletion tombstones
- resume prompt generation
- profile import parsing
- PDF export helper behavior
