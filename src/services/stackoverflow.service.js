const { chromium } = require("playwright-extra");

const StealthPlugin =
    require("puppeteer-extra-plugin-stealth");

const randomUseragent =
    require("random-useragent");

chromium.use(StealthPlugin());

async function fetchStackOverflowJobs(
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

    // Stack Overflow Jobs URL
    const searchUrl =
        `https://stackoverflow.com/jobs?q=${encodeURIComponent(searchQuery)}&l=${encodeURIComponent(location)}&d=10&u=Km`;

    console.log(
        "Opening Stack Overflow Jobs"
    );

    try {
        await page.goto(searchUrl, {
            waitUntil: "domcontentloaded",
            timeout: 60000
        });

        await page.waitForTimeout(3000);

        console.log("Scraping Stack Overflow Jobs");

        const jobs =
            await page.evaluate(() => {

                const cards =
                    document.querySelectorAll(
                        "-job-summary"
                    );

                return Array.from(cards)
                    .slice(0, 30)
                    .map(card => {
                        const titleEl =
                            card.querySelector(
                                ".s-link"
                            );
                        
                        const companyEl =
                            card.querySelector(
                                ".fc-black-500"
                            );
                        
                        const locationEl =
                            card.querySelector(
                                ".fc-black-400"
                            );
                        
                        const urlEl =
                            card.querySelector(
                                "a"
                            );

                        return {
                            title:
                                titleEl?.innerText?.trim(),
                            company:
                                companyEl?.innerText?.trim(),
                            location:
                                locationEl?.innerText?.trim(),
                            url:
                                urlEl?.href ?
                                `https://stackoverflow.com${urlEl.href}` :
                                null,
                            posted:
                                "Recently posted",
                            source:
                                "Stack Overflow"
                        };
                    })
                    .filter(job => job.title && job.url);
            });

        await browser.close();

        return jobs;

    } catch (error) {
        console.error("Error fetching Stack Overflow jobs:", error);
        await browser.close();
        return [];
    }
}

module.exports = {
    fetchStackOverflowJobs
};
