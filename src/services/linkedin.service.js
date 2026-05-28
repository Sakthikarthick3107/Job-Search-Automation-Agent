const { chromium } = require("playwright-extra");

const StealthPlugin =
    require("puppeteer-extra-plugin-stealth");

const randomUseragent =
    require("random-useragent");

chromium.use(StealthPlugin());

async function fetchLinkedInJobs(
    searchQuery = "software developer",
    location = "India",
    workType = "hybrid"
) {

    const browser =
        await chromium.launch({
            headless: true,
            args: [
                "--disable-blink-features=AutomationControlled"
            ]
        });

    const page =
        await browser.newPage({
            userAgent:
                randomUseragent.getRandom()
        });

    await page.setViewportSize({
        width: 1400,
        height: 900
    });

    await page.setExtraHTTPHeaders({
        "accept-language":
            "en-US,en;q=0.9"
    });

    // LinkedIn filters:
    // f_TPR filters
    // r86400   = 24 hours
    // r172800  = 2 days
    // r604800  = 7 days (1 week)
    // f_WT work type filters:
    // 1 = onsite
    // 2 = remote
    // 3 = hybrid

    const postedFilter =
        "&f_TPR=r604800"; // last 1 week

    let workTypeFilter = "";

    if (workType === "remote") {
        workTypeFilter = "&f_WT=2";
    }
    else if (workType === "hybrid") {
        workTypeFilter = "&f_WT=3";
    }
    else if (workType === "onsite") {
        workTypeFilter = "&f_WT=1";
    }

    const searchUrl =
        `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(location)}${postedFilter}${workTypeFilter}`;

    console.log(
        "Opening LinkedIn Jobs"
    );

    await page.goto(searchUrl, {
        waitUntil: "domcontentloaded",
        timeout: 60000
    });

    await page.waitForTimeout(5000);

    console.log("Scraping Jobs");

    const jobs =
        await page.evaluate(() => {

            const cards =
                document.querySelectorAll(
                    ".base-card"
                );

            return Array.from(cards)
                .slice(0, 30)
                .map(card => ({

                    title:
                        card.querySelector(
                            ".base-search-card__title"
                        )?.innerText?.trim(),

                    company:
                        card.querySelector(
                            ".base-search-card__subtitle"
                        )?.innerText?.trim(),

                    location:
                        card.querySelector(
                            ".job-search-card__location"
                        )?.innerText?.trim(),

                    url:
                        card.querySelector("a")
                        ?.href,

                    posted:
                        card.querySelector("time")
                        ?.innerText?.trim()
                }))
                .filter(job => job.title);
        });

    await browser.close();

    return jobs;
}

module.exports = {
    fetchLinkedInJobs
};