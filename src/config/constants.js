module.exports = {

    RESUME_URL:
        process.env.RESUME_URL ||
        "https://docs.google.com/document/d/1p04dSSFhMxsoyrjaXifkKiaClJTT6AttjCQ46JAQJkw/export?format=txt",

    JOB_LIMIT: 20,

    // Parse job searches from environment variable
    JOB_SEARCHES:
        parseJobSearches(
            process.env.JOB_SEARCHES
        )
};

function parseJobSearches(searchString) {
    if (!searchString) {
        // Use DEFAULT_JOB_SEARCHES from env or hardcoded fallback
        searchString =
            process.env.DEFAULT_JOB_SEARCHES ||
            "Angular Developer|Chennai|hybrid,.NET Developer|Chennai|hybrid,Flutter Developer|Remote|remote,Software Developer|Chennai|hybrid";
    }

    return searchString
        .split(",")
        .map(search => {
            const [query, location, type] =
                search
                    .trim()
                    .split("|");

            return {
                query: query.trim(),
                location: location.trim(),
                type: type.trim()
            };
        });
}