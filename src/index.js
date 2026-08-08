require("dotenv").config();

const {
    fetchLinkedInJobs
} = require("./services/linkedin.service");

const {
    fetchIndeedJobs
} = require("./services/indeed.service");

const {
    fetchNaukriJobs
} = require("./services/naukri.service");

const {
    fetchGlassdoorJobs
} = require("./services/glassdoor.service");

const {
    fetchStackOverflowJobs
} = require("./services/stackoverflow.service");

const {
    sendMail
} = require("./services/mail.service");

const {
    JOB_SEARCHES,
    RESUME_URL,
    SEND_EMAIL_WHEN_NO_NEW_JOBS
} = require("./config/constants");

const {
    jobKey,
    loadSeenKeys,
    saveSeenKeys
} = require("./services/state.service");

async function main() {

    let allJobs = [];
    let fetchedCount = 0;

    const seenKeys = loadSeenKeys();

    const addJobs = (jobs) => {
        fetchedCount += jobs.length;

        let newCount = 0;
        for (const job of jobs) {
            const key = jobKey(job);
            if (seenKeys.has(key)) {
                continue;
            }
            seenKeys.add(key);
            allJobs.push(job);
            newCount++;
        }
        return newCount;
    };

    // ===== LinkedIn Jobs =====
    console.log("\n📌 Fetching Jobs from LinkedIn\n");

    for (const search of JOB_SEARCHES) {
        console.log(
            `Searching: ${search.query} in ${search.location} (${search.type})`
        );

        const jobs =
            await fetchLinkedInJobs(
                search.query,
                search.location,
                search.type
            );

        console.log(
            `✅ Fetched ${jobs.length} jobs from LinkedIn (${addJobs(jobs)} new)`
        );
    }

    // ===== Indeed Jobs =====
    console.log("\n📌 Fetching Jobs from Indeed\n");

    for (const search of JOB_SEARCHES) {
        console.log(
            `Searching: ${search.query} in ${search.location}`
        );

        const jobs =
            await fetchIndeedJobs(
                search.query,
                search.location
            );

        console.log(
            `✅ Fetched ${jobs.length} jobs from Indeed (${addJobs(jobs)} new)`
        );
    }

    // ===== Naukri Jobs =====
    console.log("\n📌 Fetching Jobs from Naukri\n");

    for (const search of JOB_SEARCHES) {
        console.log(
            `Searching: ${search.query} in ${search.location}`
        );

        const jobs =
            await fetchNaukriJobs(
                search.query,
                search.location
            );

        console.log(
            `✅ Fetched ${jobs.length} jobs from Naukri (${addJobs(jobs)} new)`
        );
    }

    // ===== Glassdoor Jobs =====
    console.log("\n📌 Fetching Jobs from Glassdoor\n");

    for (const search of JOB_SEARCHES) {
        console.log(
            `Searching: ${search.query} in ${search.location}`
        );

        const jobs =
            await fetchGlassdoorJobs(
                search.query,
                search.location
            );

        console.log(
            `✅ Fetched ${jobs.length} jobs from Glassdoor (${addJobs(jobs)} new)`
        );
    }

    // ===== Stack Overflow Jobs =====
    console.log("\n📌 Fetching Jobs from Stack Overflow\n");

    for (const search of JOB_SEARCHES) {
        console.log(
            `Searching: ${search.query} in ${search.location}`
        );

        const jobs =
            await fetchStackOverflowJobs(
                search.query,
                search.location
            );

        console.log(
            `✅ Fetched ${jobs.length} jobs from Stack Overflow (${addJobs(jobs)} new)`
        );
    }

    console.log(
        `\n🎯 Fetched ${fetchedCount} jobs total, ${allJobs.length} new since last run\n`
    );

    if (allJobs.length === 0 && !SEND_EMAIL_WHEN_NO_NEW_JOBS) {
        console.log("😴 No new jobs found. Skipping email.");
        saveSeenKeys(seenKeys);
        return;
    }

    console.log("Sending email with new job results");

    await sendMail({
        matchedJobs: allJobs,
        resumeUrl: RESUME_URL
    });

    saveSeenKeys(seenKeys);

    console.log("Email sent successfully!");

    console.log("Job Search Completed Successfully!");
}

main();