require("dotenv").config();

const {
    fetchLinkedInJobs
} = require("./services/linkedin.service");

const {
    sendMail
} = require("./services/mail.service");

const {
    JOB_SEARCHES
} = require("./config/constants");

async function main() {

    console.log("Fetching Jobs from LinkedIn");

    let allJobs = [];

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
            `Fetched ${jobs.length} jobs for ${search.query}`
        );

        allJobs = [...allJobs, ...jobs];
    }

    console.log(
        `Total fetched ${allJobs.length} jobs`
    );

    console.log("Sending email with job results");

    await sendMail({
        matchedJobs: allJobs
    });

    console.log("Email sent successfully!");

    console.log("Job Search Completed Successfully!");
}

main();