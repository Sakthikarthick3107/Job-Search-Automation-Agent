const { chromium } = require("playwright-extra");

const StealthPlugin =
    require("puppeteer-extra-plugin-stealth");

const randomUseragent =
    require("random-useragent");

chromium.use(StealthPlugin());

async function fetchGlassdoorJobs(
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

    // Glassdoor search URL
    const searchUrl =
        `https://www.glassdoor.co.in/Job/jobs.htm?sc.keyword=${encodeURIComponent(searchQuery)}&locId=${encodeURIComponent(location)}&jobType=fulltime`;

    console.log(
        "Opening Glassdoor Jobs"
    );

    try {
        await page.goto(searchUrl, {
            waitUntil: "domcontentloaded",
            timeout: 60000
        });

        await page.waitForTimeout(3000);

        console.log("Scraping Glassdoor Jobs");

        const jobs =
            await page.evaluate(() => {

                const cards =
                    document.querySelectorAll(
                        ".JobCard_jobCardContainer__RLjf8"
                    );

                return Array.from(cards)
                    .slice(0, 30)
                    .map(card => {
                        const titleEl =
                            card.querySelector(
                                ".JobCard_jobTitle__Ey87O"
                            );
                        
                        const companyEl =
                            card.querySelector(
                                ".EmployerName_employerName__MbIxc"
                            );
                        
                        const locationEl =
                            card.querySelector(
                                ".JobCard_location__4V9Hy"
                            );
                        
                        const urlEl =
                            card.querySelector(
                                "a[href*='/job-listing/']"
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
                                "Glassdoor"
                        };
                    })
                    .filter(job => job.title);
            });

        await browser.close();

        return jobs;

    } catch (error) {
        console.error("Error fetching Glassdoor jobs:", error);
        await browser.close();
        return [];
    }
}

module.exports = {
    fetchGlassdoorJobs
};
