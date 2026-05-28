const { chromium } = require("playwright-extra");

const StealthPlugin =
    require("puppeteer-extra-plugin-stealth");

const randomUseragent =
    require("random-useragent");

chromium.use(StealthPlugin());

async function fetchNaukriJobs(
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

    // Naukri search URL
    // experience can be adjusted
    // fresher=Y for fresher roles
    const searchUrl =
        `https://www.naukri.com/jobs-${encodeURIComponent(searchQuery.replace(/\s+/g, '-'))}-in-${encodeURIComponent(location)}`;

    console.log(
        "Opening Naukri Jobs"
    );

    try {
        await page.goto(searchUrl, {
            waitUntil: "domcontentloaded",
            timeout: 60000
        });

        await page.waitForTimeout(3000);

        console.log("Scraping Naukri Jobs");

        const jobs =
            await page.evaluate(() => {

                const cards =
                    document.querySelectorAll(
                        ".nI6yVV"
                    );

                return Array.from(cards)
                    .slice(0, 30)
                    .map(card => {
                        const titleEl =
                            card.querySelector(
                                ".jJTZqv"
                            );
                        
                        const companyEl =
                            card.querySelector(
                                ".KLgc38"
                            );
                        
                        const locationEl =
                            card.querySelector(
                                ".cutOff"
                            );
                        
                        const urlEl =
                            card.querySelector(
                                "a.nJghtb"
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
                                "Naukri"
                        };
                    })
                    .filter(job => job.title);
            });

        await browser.close();

        return jobs;

    } catch (error) {
        console.error("Error fetching Naukri jobs:", error);
        await browser.close();
        return [];
    }
}

module.exports = {
    fetchNaukriJobs
};
