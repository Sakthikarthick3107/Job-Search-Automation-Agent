# Job Search Configuration Guide

## Overview

Job searches are now configured using a **JSON-based structure** in `jobs-config.json` instead of environment variables. This makes it much easier to add, edit, or remove job searches without redeploying.

## Configuration File: `jobs-config.json`

### Structure

```json
{
  "jobSearches": [
    {
      "title": "Angular Developer",
      "query": "Angular Developer",
      "location": "Chennai",
      "type": "hybrid"
    },
    {
      "title": ".NET Developer",
      "query": ".NET Developer",
      "location": "Chennai",
      "type": "hybrid"
    }
  ]
}
```

### Fields Explanation

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `title` | string | Display name for this job search | "Angular Developer" |
| `query` | string | Search query to use on job portals | "Angular Developer" |
| `location` | string | Job location preference | "Chennai", "Remote", "Bangalore" |
| `type` | string | Work type - `remote`, `hybrid`, or `onsite` | "hybrid" |

### Work Type Options

- **`remote`**: Work from anywhere
- **`hybrid`**: Mix of office and remote
- **`onsite`**: Work from office only

## How to Edit Job Searches

### Adding a New Search

Simply add a new object to the `jobSearches` array:

```json
{
  "jobSearches": [
    {
      "title": "React Developer",
      "query": "React Developer",
      "location": "Bangalore",
      "type": "remote"
    }
  ]
}
```

### Removing a Search

Delete the entire object from the array:

```json
{
  "jobSearches": [
    // Remove the entry completely
  ]
}
```

### Modifying a Search

Edit the relevant fields:

```json
{
  "title": "Senior Angular Developer",  // Changed from "Angular Developer"
  "query": "Senior Angular Developer",
  "location": "Hyderabad",              // Changed from "Chennai"
  "type": "remote"                      // Changed from "hybrid"
}
```

## Examples

### Example 1: Backend Developer (Remote)
```json
{
  "title": "Backend Developer",
  "query": "Backend Developer",
  "location": "Remote",
  "type": "remote"
}
```

### Example 2: Data Science (Hybrid, Bangalore)
```json
{
  "title": "Data Scientist",
  "query": "Data Scientist",
  "location": "Bangalore",
  "type": "hybrid"
}
```

### Example 3: Full Stack (Onsite, Chennai)
```json
{
  "title": "Full Stack Developer",
  "query": "Full Stack Developer",
  "location": "Chennai",
  "type": "onsite"
}
```

## Complete Example Configuration

```json
{
  "jobSearches": [
    {
      "title": "Angular Developer",
      "query": "Angular Developer",
      "location": "Chennai",
      "type": "hybrid"
    },
    {
      "title": ".NET Developer",
      "query": ".NET Developer",
      "location": "Chennai",
      "type": "hybrid"
    },
    {
      "title": "Flutter Developer",
      "query": "Flutter Developer",
      "location": "Remote",
      "type": "remote"
    },
    {
      "title": "Software Developer",
      "query": "Software Developer",
      "location": "Chennai",
      "type": "hybrid"
    },
    {
      "title": "DevOps Engineer",
      "query": "DevOps Engineer",
      "location": "Remote",
      "type": "remote"
    },
    {
      "title": "Data Scientist",
      "query": "Data Scientist",
      "location": "Bangalore",
      "type": "hybrid"
    }
  ]
}
```

## How It Works

1. When the application starts, it loads `jobs-config.json` automatically
2. For each job search configuration, it queries all 5 job portals:
   - LinkedIn
   - Indeed
   - Naukri
   - Glassdoor
   - Stack Overflow
3. Jobs are filtered by:
   - Location
   - Work type (remote/hybrid/onsite)
   - Posted within the last 7 days
4. Results are sent via email grouped by job portal with portal-specific colors

## Important Notes

- **File Location**: `jobs-config.json` must be in the project root directory
- **JSON Validation**: Ensure the file is valid JSON (proper commas, brackets, etc.)
- **No Restarts Needed**: Just edit the file and re-run the application
- **Fallback**: If `jobs-config.json` is missing or invalid, the app uses hardcoded defaults

## Validation Tips

- Ensure all strings are in double quotes: `"title"` not `'title'`
- Commas between objects in the array: `{ ... }, { ... }`
- No trailing comma after the last object
- Use an online JSON validator if unsure: https://jsonlint.com/

## Error Handling

If `jobs-config.json` cannot be loaded, you'll see a warning:
```
⚠️  Could not load jobs-config.json, using fallback searches
```

This means the app will fall back to the hardcoded default searches while you fix the file.
