const { chromium } = require("playwright-extra");

const StealthPlugin =
    require("puppeteer-extra-plugin-stealth");

const randomUseragent =
    require("random-useragent");

chromium.use(StealthPlugin());

async function fetchIndeedJobs(
    searchQuery = "software developer",
    location = "India"
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

    // Indeed search URL
    // jt=1 = full time
    // date=7 = last 7 days
    const searchUrl =
        `https://in.indeed.com/jobs?q=${encodeURIComponent(searchQuery)}&l=${encodeURIComponent(location)}&jt=1&date=7`;

    console.log(
        "Opening Indeed Jobs"
    );

    try {
        await page.goto(searchUrl, {
            waitUntil: "domcontentloaded",
            timeout: 60000
        });

        await page.waitForTimeout(3000);

        console.log("Scraping Indeed Jobs");

        const jobs =
            await page.evaluate(() => {

                const cards =
                    document.querySelectorAll(
                        "[data-job-id]"
                    );

                return Array.from(cards)
                    .slice(0, 30)
                    .map(card => {
                        const titleEl =
                            card.querySelector(
                                ".jcs-JobTitle"
                            );
                        
                        const companyEl =
                            card.querySelector(
                                "[data-company-name]"
                            );
                        
                        const locationEl =
                            card.querySelector(
                                ".css-qvjvy0"
                            );
                        
                        const urlEl =
                            card.querySelector(
                                "a[href*='/viewjob']"
                            );

                        return {
                            title:
                                titleEl?.innerText?.trim(),
                            company:
                                companyEl?.innerText?.trim(),
                            location:
                                locationEl?.innerText?.trim(),
                            url:
                                urlEl?.href,
                            posted:
                                "Recently posted",
                            source:
                                "Indeed"
                        };
                    })
                    .filter(job => job.title);
            });

        await browser.close();

        return jobs;

    } catch (error) {
        console.error("Error fetching Indeed jobs:", error);
        await browser.close();
        return [];
    }
}

module.exports = {
    fetchIndeedJobs
};
