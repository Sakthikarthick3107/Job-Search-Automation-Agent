# Configuration Flow Guide

## 🔄 How Configuration Values Flow

### Local Development
```
.env.example (TEMPLATE - in repo)
    ↓
cp .env.example .env (YOU create this locally)
    ↓
Edit .env with YOUR actual values
    ↓
dotenv loads .env
    ↓
process.env.* available in code
    ↓
.env is NOT pushed (in .gitignore)
```

### GitHub Actions (CI/CD)
```
.env.example (in repo - shows format)
    ↓
GitHub Secrets (EMAIL_USER, EMAIL_PASS)
    ↓
GitHub Workflow passes as env vars
    ↓
process.env.* available in code
    ↓
No .env file needed - secrets injected
```

---

## 📋 What Gets Pushed to GitHub?

### ✅ ALWAYS PUSH
- `.env.example` - Configuration template
- `src/` - All source code
- `package.json` - Dependencies
- `SETUP.md` - Setup instructions
- `.gitignore` - Security rules
- `README.md` - Project info

### ❌ NEVER PUSH (Protected by .gitignore)
- `.env` - Your actual secrets
- `node_modules/` - Dependencies folder
- `*.log` - Log files

---

## 🔐 Secrets Handling

### Local (.env file)
```env
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
JOB_SEARCHES=Angular Developer|Chennai|hybrid
RESUME_URL=https://docs.google.com/...
```
**Only on YOUR machine - not pushed**

### GitHub (Secrets + Variables)
```
Settings → Secrets and variables → Actions

SECRETS (encrypted, hidden):
- EMAIL_USER
- EMAIL_PASS

VARIABLES (visible, configurable):
- JOB_SEARCHES
- RESUME_URL
```

---

## 🚀 Setup Checklist

- [ ] Clone repo
- [ ] Run `npm install`
- [ ] Copy `.env.example` to `.env`
- [ ] Edit `.env` with your values
- [ ] Test locally: `node src/index.js`
- [ ] Push to GitHub (`.env` stays local)
- [ ] Add GitHub Secrets (EMAIL_USER, EMAIL_PASS)
- [ ] Create GitHub Workflow (optional)

---

## 💡 Key Points

1. **`.env.example` is your template** - Shows what variables are needed
2. **`.env` is your config** - You edit this locally, never push it
3. **GitHub Secrets** - Replace `.env` in CI/CD environment
4. **Configuration is flexible** - Change `JOB_SEARCHES` anytime via `.env` or GitHub
5. **Secrets are safe** - Never exposed in logs or code

---

## Example: Changing Searches

### Method 1: Local Testing
Edit `.env`:
```env
JOB_SEARCHES=React Developer|Bangalore|remote,Python|Remote|remote
```

### Method 2: GitHub Workflow
In workflow file or GitHub Variables - no `.env` needed!

### Method 3: GitHub UI
Go to Settings → Variables → `JOB_SEARCHES` → Update

All methods work without modifying code! 🎯
