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
    sendMail
} = require("./services/mail.service");

const {
    JOB_SEARCHES
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

    console.log(
        `\n🎯 Total fetched ${allJobs.length} jobs from all platforms\n`
    );

    console.log("Sending email with job results");

    await sendMail({
        matchedJobs: allJobs
    });

    console.log("Email sent successfully!");

    console.log("Job Search Completed Successfully!");
}

main();