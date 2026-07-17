const generateMail = (data) => {
    const jobsBySource = {};
    data.matchedJobs.forEach(job => {
        const source = job.source || "LinkedIn";
        if (!jobsBySource[source]) {
            jobsBySource[source] = [];
        }
        jobsBySource[source].push(job);
    });

    const portalIcons = {
        "LinkedIn": "🔵",
        "Indeed": "🔍",
        "Naukri": "🇮🇳",
        "Glassdoor": "🏢",
        "Stack Overflow": "💻"
    };

    let portalsHtml = '';
    Object.entries(jobsBySource).forEach(([source, jobs]) => {
        const icon = portalIcons[source] || "📌";

        portalsHtml += `
            <table class="portal" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                    <td class="portal-title">
                        ${icon} ${source}
                        <span class="portal-count">${jobs.length}</span>
                    </td>
                </tr>
        `;

        jobs.forEach((job, idx) => {
            portalsHtml += `
                <tr>
                    <td class="job-card" style="${idx === jobs.length - 1 ? 'border-bottom: none;' : ''}">
                        <a href="${job.url}" class="job-title">${job.title}</a>
                        <div class="job-meta">
                            <span class="job-company">${job.company || 'N/A'}</span>
                            <span class="dot">·</span>
                            <span class="job-location">${job.location || 'N/A'}</span>
                        </div>
                        <a href="${job.url}" class="job-apply">Apply →</a>
                    </td>
                </tr>
            `;
        });

        portalsHtml += `</table>`;
    });

    const total = data.matchedJobs.length;

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    background-color: #f1f5f9;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                    line-height: 1.5;
                    color: #1e293b;
                }
                .outer {
                    width: 100%;
                    background-color: #f1f5f9;
                    padding: 24px 0;
                }
                .container {
                    max-width: 560px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
                }
                .header {
                    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                    padding: 36px 32px 28px;
                    text-align: center;
                }
                .header h1 {
                    margin: 0 0 6px;
                    font-size: 22px;
                    color: #ffffff;
                    font-weight: 700;
                    letter-spacing: -0.3px;
                }
                .header p {
                    margin: 0;
                    font-size: 13px;
                    color: #94a3b8;
                }
                .stats {
                    background: #f8fafc;
                    padding: 20px 32px;
                    text-align: center;
                    border-bottom: 1px solid #e2e8f0;
                }
                .stats-number {
                    font-size: 32px;
                    font-weight: 700;
                    color: #0f172a;
                    line-height: 1;
                }
                .stats-label {
                    font-size: 13px;
                    color: #64748b;
                    margin-top: 4px;
                }
                .content {
                    padding: 24px 32px 8px;
                }
                .greeting {
                    font-size: 15px;
                    color: #475569;
                    margin: 0 0 20px;
                    line-height: 1.6;
                }
                .portal {
                    width: 100%;
                    border-collapse: separate;
                    border-spacing: 0;
                    margin-bottom: 20px;
                    border: 1px solid #e2e8f0;
                    border-radius: 10px;
                    overflow: hidden;
                }
                .portal-title {
                    padding: 12px 16px;
                    font-size: 14px;
                    font-weight: 600;
                    color: #0f172a;
                    background: #f8fafc;
                    border-bottom: 1px solid #e2e8f0;
                }
                .portal-count {
                    float: right;
                    display: inline-block;
                    padding: 1px 8px;
                    font-size: 11px;
                    font-weight: 600;
                    color: #64748b;
                    background: #e2e8f0;
                    border-radius: 10px;
                }
                .job-card {
                    padding: 14px 16px;
                    border-bottom: 1px solid #f1f5f9;
                    position: relative;
                }
                .job-title {
                    font-size: 15px;
                    font-weight: 600;
                    color: #0f172a;
                    text-decoration: none;
                    display: block;
                    margin-bottom: 4px;
                    line-height: 1.4;
                }
                .job-title:hover {
                    color: #3b82f6;
                }
                .job-meta {
                    font-size: 13px;
                    color: #64748b;
                }
                .job-company {
                    font-weight: 500;
                    color: #475569;
                }
                .dot {
                    margin: 0 4px;
                    color: #cbd5e1;
                }
                .job-location {
                    color: #64748b;
                }
                .job-apply {
                    display: inline-block;
                    margin-top: 8px;
                    font-size: 12px;
                    font-weight: 600;
                    color: #3b82f6;
                    text-decoration: none;
                }
                .job-apply:hover {
                    color: #2563eb;
                }
                .resume-section {
                    margin: 32px 0 0;
                    padding: 20px 0 0;
                    border-top: 1px solid #e2e8f0;
                }
                .resume-label {
                    font-size: 13px;
                    font-weight: 600;
                    color: #0f172a;
                    margin: 0 0 10px;
                }
                .resume-link {
                    display: inline-block;
                    padding: 10px 24px;
                    font-size: 13px;
                    font-weight: 600;
                    color: #ffffff;
                    background: #0f172a;
                    border-radius: 8px;
                    text-decoration: none;
                }
                .resume-link:hover {
                    background: #1e293b;
                }
                .footer {
                    padding: 24px 32px;
                    text-align: center;
                    font-size: 11px;
                    color: #94a3b8;
                    line-height: 1.6;
                }
                .footer strong {
                    color: #64748b;
                }
                @media (max-width: 600px) {
                    .outer {
                        padding: 0;
                    }
                    .container {
                        max-width: 100%;
                        border-radius: 0;
                    }
                    .header {
                        padding: 28px 20px 24px;
                    }
                    .header h1 {
                        font-size: 20px;
                    }
                    .content {
                        padding: 20px 16px 8px;
                    }
                    .portal {
                        margin-bottom: 16px;
                    }
                    .job-card {
                        padding: 12px 14px;
                    }
                    .job-title {
                        font-size: 14px;
                    }
                    .footer {
                        padding: 20px 16px;
                    }
                }
                @media (max-width: 400px) {
                    .header h1 {
                        font-size: 18px;
                    }
                    .stats-number {
                        font-size: 28px;
                    }
                    .job-meta {
                        font-size: 12px;
                    }
                }
            </style>
        </head>
        <body>
            <table class="outer" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                    <td align="center">
                        <table class="container" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                                <td class="header">
                                    <h1>Job Search Report</h1>
                                    <p>${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </td>
                            </tr>
                            <tr>
                                <td class="stats">
                                    <div class="stats-number">${total}</div>
                                    <div class="stats-label">new opportunities found</div>
                                </td>
                            </tr>
                            <tr>
                                <td class="content">
                                    <p class="greeting">
                                        Here are the latest positions matching your profile, grouped by source.
                                    </p>
                                    ${portalsHtml}
                                    <table class="resume-section" cellpadding="0" cellspacing="0" border="0" width="100%">
                                        <tr>
                                            <td>
                                                <p class="resume-label">Your Resume</p>
                                                <a href="${data.resumeUrl}" class="resume-link">View Resume</a>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td class="footer">
                                    Sent by your Job Search Automation &middot; Updated ${new Date().toLocaleString()}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
    `;
};

module.exports = { generateMail };
