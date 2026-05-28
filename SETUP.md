# Job Search Automation - Setup Guide

## Local Development Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd jobsearch_automation
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create `.env` File
Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Then edit `.env` with your actual values:

```env
# Email Configuration (required for notifications)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Job Search Configuration (customize as needed)
JOB_SEARCHES=Angular Developer|Chennai|hybrid,.NET Developer|Chennai|hybrid,Flutter Developer|Remote|remote,Software Developer|Chennai|hybrid

# Resume URL (your Google Docs export link)
RESUME_URL=https://docs.google.com/document/d/YOUR_DOCUMENT_ID/export?format=txt

# Default searches (fallback)
DEFAULT_JOB_SEARCHES=Angular Developer|Chennai|hybrid,.NET Developer|Chennai|hybrid,Flutter Developer|Remote|remote,Software Developer|Chennai|hybrid
```

### 4. Run Locally
```bash
node src/index.js
```

---

## Configuration Values

### JOB_SEARCHES & DEFAULT_JOB_SEARCHES

Format: `query|location|type` (comma-separated)

**Examples:**
```env
JOB_SEARCHES=React Developer|Bangalore|remote,Python Developer|Remote|remote,Java Developer|Hyderabad|onsite
```

**Types available:**
- `remote` - Work from home
- `hybrid` - Mix of office and remote
- `onsite` - Office only

### EMAIL Configuration

- **EMAIL_USER**: Your Gmail address (must be Gmail)
- **EMAIL_PASS**: App-specific password (NOT your Gmail password!)
  - [Generate App Password](https://myaccount.google.com/apppasswords)

### RESUME_URL

Get your Google Docs export link:
1. Open your resume in Google Docs
2. Click **File → Download → Plain Text**
3. This gives you the format to use in the URL

---

## GitHub Actions Setup (CI/CD)

### 1. Add GitHub Secrets

Go to **Repository Settings → Secrets and variables → Actions**

Add these secrets:
- `EMAIL_USER` = your_email@gmail.com
- `EMAIL_PASS` = your_app_password

### 2. Create Workflow File

Create `.github/workflows/job-search.yml`:

```yaml
name: Job Search Automation

on:
  schedule:
    - cron: '0 9 * * 1-5'  # Monday-Friday at 9 AM
  workflow_dispatch:

jobs:
  search:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm install
      
      - run: node src/index.js
        env:
          EMAIL_USER: ${{ secrets.EMAIL_USER }}
          EMAIL_PASS: ${{ secrets.EMAIL_PASS }}
          JOB_SEARCHES: ${{ vars.JOB_SEARCHES || 'Angular Developer|Chennai|hybrid' }}
          RESUME_URL: ${{ vars.RESUME_URL }}
```

### 3. Push to GitHub

The `.env` file is in `.gitignore` and won't be pushed. Only `.env.example` is in the repo.

---

## File Structure

```
.
├── .env                    # ❌ NOT pushed (in .gitignore)
├── .env.example            # ✅ Pushed - shows format
├── src/
│   ├── index.js
│   ├── config/
│   │   └── constants.js
│   └── services/
│       ├── linkedin.service.js
│       ├── mail.service.js
│       └── ...
└── README.md
```

---

## What Gets Pushed to GitHub?

✅ **Pushed:**
- Source code (`src/`)
- `.env.example` (template only)
- `.gitignore`
- `package.json`
- `package-lock.json`
- `README.md`
- `.github/workflows/` (CI/CD configs)

❌ **NOT Pushed:**
- `.env` (your actual secrets)
- `node_modules/`
- Logs

---

## Environment Variable Reference

| Variable | Required | Example | Notes |
|----------|----------|---------|-------|
| `EMAIL_USER` | Yes | your_email@gmail.com | Gmail only |
| `EMAIL_PASS` | Yes | xyzabc123 | App password |
| `JOB_SEARCHES` | No | query\|location\|type | Default used if empty |
| `RESUME_URL` | No | https://docs.google.com/... | For AI analysis |

---

## Troubleshooting

### "Cannot find module 'dotenv'"
```bash
npm install
```

### "Gmail authentication failed"
- Ensure you're using an **App Password**, not your Gmail password
- [Generate one here](https://myaccount.google.com/apppasswords)

### Jobs not fetching
- Check that `JOB_SEARCHES` format is correct: `query|location|type`
- Verify LinkedIn isn't blocking the scraper

---

## Quick Start Commands

```bash
# Install dependencies
npm install

# Copy example env
cp .env.example .env

# Edit your settings
nano .env

# Run job search
node src/index.js
```
