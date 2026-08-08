const fs = require("fs");
const path = require("path");

const SEEN_FILE = path.join(
    __dirname, "..", "..", "data", "seen-jobs.json"
);

const MAX_SEEN_KEYS = 3000;

function jobKey(job) {
    if (job && job.url) {
        return job.url;
    }

    const title =
        (job?.title || "")
            .toLowerCase()
            .replace(/\s+/g, " ")
            .trim();
    const company =
        (job?.company || "")
            .toLowerCase()
            .replace(/\s+/g, " ")
            .trim();
    const location =
        (job?.location || "")
            .toLowerCase()
            .replace(/\s+/g, " ")
            .trim();

    return `${title}::${company}::${location}`;
}

function loadSeenKeys() {
    try {
        const content = fs.readFileSync(SEEN_FILE, "utf-8");
        const list = JSON.parse(content);
        if (!Array.isArray(list)) {
            return new Set();
        }
        return new Set(list);
    } catch (error) {
        console.warn(
            "⚠️  No previous seen state found, treating all fetched jobs as new."
        );
        return new Set();
    }
}

function saveSeenKeys(keys) {
    const dir = path.dirname(SEEN_FILE);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const trimmed = Array.from(keys).slice(-MAX_SEEN_KEYS);
    fs.writeFileSync(SEEN_FILE, JSON.stringify(trimmed, null, 2));
}

module.exports = {
    jobKey,
    loadSeenKeys,
    saveSeenKeys
};