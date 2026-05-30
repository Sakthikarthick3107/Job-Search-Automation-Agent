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
    RESUME_URL
} = require("./config/constants");

async function main() {

    let allJobs = [];

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
            `✅ Fetched ${jobs.length} jobs from LinkedIn`
        );

        allJobs = [...allJobs, ...jobs];
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
            `✅ Fetched ${jobs.length} jobs from Indeed`
        );

        allJobs = [...allJobs, ...jobs];
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
            `✅ Fetched ${jobs.length} jobs from Naukri`
        );

        allJobs = [...allJobs, ...jobs];
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
            `✅ Fetched ${jobs.length} jobs from Glassdoor`
        );

        allJobs = [...allJobs, ...jobs];
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
            `✅ Fetched ${jobs.length} jobs from Stack Overflow`
        );

        allJobs = [...allJobs, ...jobs];
    }

    console.log(
        `\n🎯 Total fetched ${allJobs.length} jobs from all platforms\n`
    );

    console.log("Sending email with job results");

    await sendMail({
        matchedJobs: allJobs,
        resumeUrl: RESUME_URL
    });

    console.log("Email sent successfully!");

    console.log("Job Search Completed Successfully!");
}

main();