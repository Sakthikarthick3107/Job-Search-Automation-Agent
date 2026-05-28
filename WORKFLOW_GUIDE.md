# GitHub Workflow Configuration Guide

## 🔄 Complete Flow

```
GitHub Workflow Runs (CI/CD)
    ↓
Reads from Repository Settings:
    ├── Secrets (encrypted)
    │   ├── EMAIL_USER
    │   └── EMAIL_PASS
    │
    └── Variables (visible)
        ├── JOB_SEARCHES
        └── RESUME_URL
    ↓
Injects as Environment Variables
    ↓
Your Code (index.js)
    ├── dotenv loads .env (if exists locally)
    ├── process.env.* from workflow env vars
    └── process.env.* from GitHub Secrets/Variables
    ↓
LinkedIn Scraping Works!
```

---

## 📝 Setup Steps

### Step 1: Add GitHub Secrets

Go to: **Repository → Settings → Secrets and variables → Actions**

Click "New repository secret":

```
Name: EMAIL_USER
Value: your_email@gmail.com
```

```
Name: EMAIL_PASS
Value: your_app_password
```

### Step 2: Add GitHub Variables

Go to: **Repository → Settings → Secrets and variables → Variables**

Click "New repository variable":

```
Name: JOB_SEARCHES
Value: Angular Developer|Chennai|hybrid,.NET Developer|Chennai|hybrid,Flutter Developer|Remote|remote
```

```
Name: RESUME_URL
Value: https://docs.google.com/document/d/YOUR_DOCUMENT_ID/export?format=txt
```

### Step 3: Workflow File

Your `.github/workflows/job-search.yml` reads these values:

```yaml
env:
  EMAIL_USER: ${{ secrets.EMAIL_USER }}      # From Secrets ✅
  EMAIL_PASS: ${{ secrets.EMAIL_PASS }}      # From Secrets ✅
  JOB_SEARCHES: ${{ vars.JOB_SEARCHES }}     # From Variables ✅
  RESUME_URL: ${{ vars.RESUME_URL }}         # From Variables ✅

run: node src/index.js
```

---

## 🎯 What Values Go Where?

### ✅ Secrets (Encrypted, Hidden)
- `EMAIL_USER`
- `EMAIL_PASS`
- Any credentials/API keys

### ✅ Variables (Visible, Easy to Change)
- `JOB_SEARCHES`
- `RESUME_URL`
- Job locations
- Any public config

### ✅ Code (`.env.example` in repo)
- Shows format/template
- Default values
- Documentation

---

## 🚀 When Workflow Runs

```
1. GitHub reads Secrets & Variables
2. Passes as env vars to workflow
3. Your code gets them via process.env.*
4. dotenv doesn't matter (no .env file in GitHub)
5. Everything works!
```

---

## 💡 Easy Config Changes

### Change Job Searches:
1. Go to Settings → Variables → `JOB_SEARCHES`
2. Edit value
3. Next workflow run uses new values
4. **No code push needed!** 🎉

### Change Resume URL:
1. Go to Settings → Variables → `RESUME_URL`
2. Edit value
3. Next workflow run uses it

### Change Email:
1. Go to Settings → Secrets → `EMAIL_USER`
2. Edit value
3. Done!

---

## 📊 Comparison: Local vs GitHub

### Local Development
```
.env (your machine)
  ↓
dotenv loads it
  ↓
process.env.* works
```

### GitHub Actions
```
GitHub Settings → Secrets & Variables
  ↓
Workflow injects as env vars
  ↓
process.env.* works
  ↓
(no .env file needed)
```

### Code (Same in Both!)
```javascript
process.env.EMAIL_USER    // Works locally AND on GitHub ✅
process.env.JOB_SEARCHES  // Works locally AND on GitHub ✅
process.env.RESUME_URL    // Works locally AND on GitHub ✅
```

---

## ⚙️ Example Configuration

### GitHub Settings

**Secrets:**
```
EMAIL_USER = sakthikarthicknagendran.dev@gmail.com
EMAIL_PASS = xafe evcx usuv jzhh
```

**Variables:**
```
JOB_SEARCHES = Angular Developer|Chennai|hybrid,.NET Developer|Chennai|hybrid,Flutter Developer|Remote|remote,Software Developer|Chennai|hybrid

RESUME_URL = https://docs.google.com/document/d/1p04dSSFhMxsoyrjaXifkKiaClJTT6AttjCQ46JAQJkw/export?format=txt
```

### Workflow File (`.github/workflows/job-search.yml`)
```yaml
name: Job Search Automation

on:
  schedule:
    - cron: '0 9 * * 1-5'
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
      - name: Run Job Search
        env:
          EMAIL_USER: ${{ secrets.EMAIL_USER }}
          EMAIL_PASS: ${{ secrets.EMAIL_PASS }}
          JOB_SEARCHES: ${{ vars.JOB_SEARCHES }}
          RESUME_URL: ${{ vars.RESUME_URL }}
        run: node src/index.js
```

---

## ✨ Benefits

✅ **Easy Changes** - Update via GitHub UI, no git push needed
✅ **Secure** - Secrets encrypted, never in logs
✅ **Flexible** - Variables visible and editable anytime
✅ **Same Code** - Works locally and on GitHub with same code
✅ **No .env in Repo** - Keeps repo clean and safe
