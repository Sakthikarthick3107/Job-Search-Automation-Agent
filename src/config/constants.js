const fs = require("fs");
const path = require("path");

// Load job searches from JSON config file
function loadJobSearches() {
    try {
        const configPath = path.join(__dirname, "../../jobs-config.json");
        const configFile = fs.readFileSync(configPath, "utf-8");
        const config = JSON.parse(configFile);
        return config.jobSearches || [];
    } catch (error) {
        console.warn("⚠️  Could not load jobs-config.json, using fallback searches");
        return [
            {
                title: "Angular Developer",
                query: "Angular Developer",
                location: "Chennai",
                type: "hybrid"
            },
            {
                title: ".NET Developer",
                query: ".NET Developer",
                location: "Chennai",
                type: "hybrid"
            },
            {
                title: "Flutter Developer",
                query: "Flutter Developer",
                location: "Remote",
                type: "remote"
            },
            {
                title: "Software Developer",
                query: "Software Developer",
                location: "Chennai",
                type: "hybrid"
            }
        ];
    }
}

module.exports = {

    RESUME_URL:
        process.env.RESUME_URL ||
        "https://docs.google.com/document/d/1p04dSSFhMxsoyrjaXifkKiaClJTT6AttjCQ46JAQJkw/export?format=txt",

    JOB_LIMIT: 20,

    // Load job searches from JSON config file
    JOB_SEARCHES: loadJobSearches()
};