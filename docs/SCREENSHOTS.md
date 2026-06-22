# Screenshot Guide

Use this guide to create public GitHub screenshots without exposing personal details.

## What To Capture

Recommended screenshots:

1. **Dashboard Pipeline**
   - Show a few sample jobs.
   - Use fake company names or blur real company/job details if needed.
   - Show status controls and the response tracker.

2. **Resume Tailor**
   - Show the split view with base resume, job description, critique, and tailored preview.
   - Blur or replace personal contact details.
   - Do not show a real phone number, email address, or private resume content.

3. **Email Monitor**
   - Show grouped application tabs.
   - Replace sender names and subjects with generic examples.
   - Do not show real Gmail contents.

4. **GitHub Export / Project Story**
   - Show the timeline, roadmap, and sanitized mockup gallery.

## Sanitization Checklist

Before uploading any screenshot:

- Hide real email addresses.
- Hide phone numbers.
- Hide home addresses.
- Hide API keys, OAuth client IDs, and tokens.
- Hide real Gmail message bodies.
- Replace personal names with "Candidate Name" if necessary.
- Replace real companies with "Example Company" unless they are already public sample data.

## Suggested File Names

Save images under a future `docs/screenshots/` folder:

```text
docs/screenshots/dashboard-pipeline.png
docs/screenshots/resume-tailor-preview.png
docs/screenshots/email-monitor.png
docs/screenshots/github-export-panel.png
```

Then reference them in the README like this:

```markdown
![Dashboard Pipeline](docs/screenshots/dashboard-pipeline.png)
```

## Note

This repository does not include actual screenshots yet because screenshots should be captured from the final running app after private details have been blurred or replaced.
