function generateMail(data) {

    if (
        !data ||
        !data.matchedJobs ||
        data.matchedJobs.length === 0
    ) {
        return `
        <html>
            <head>
                <style>
                    body {
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        margin: 0;
                        padding: 20px;
                    }
                    .container {
                        background: white;
                        border-radius: 15px;
                        box-shadow: 0 10px 40px rgba(0,0,0,0.1);
                        max-width: 600px;
                        margin: 0 auto;
                        overflow: hidden;
                    }
                    .header {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        padding: 30px;
                        text-align: center;
                    }
                    .content {
                        padding: 30px;
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🔍 Job Hunt Automation</h1>
                    </div>
                    <div class="content">
                        <h3>No new job matches today 😴</h3>
                        <p>Keep your profile updated and check back tomorrow!</p>
                    </div>
                </div>
            </body>
        </html>
        `;
    }

    const jobsHtml =
        data.matchedJobs
            .map((job, index) => `
                <tr style="border-bottom: 1px solid #e0e0e0;">
                    <td style="padding: 12px; text-align: center; font-weight: bold; color: #667eea;">
                        ${index + 1}
                    </td>
                    <td style="padding: 12px;">
                        <div style="font-weight: bold; color: #333; font-size: 14px;">
                            ${job.title}
                        </div>
                        <div style="color: #666; font-size: 12px;">
                            ${job.company}
                        </div>
                    </td>
                    <td style="padding: 12px; color: #666; font-size: 13px;">
                        📍 ${job.location || "N/A"}
                    </td>
                    <td style="padding: 12px; color: #666; font-size: 13px;">
                        🕐 ${job.posted || "N/A"}
                    </td>
                    <td style="padding: 12px; text-align: center;">
                        <a
                            href="${job.url}"
                            target="_blank"
                            style="
                                display: inline-block;
                                padding: 8px 12px;
                                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                                color: white;
                                text-decoration: none;
                                border-radius: 5px;
                                font-size: 12px;
                                font-weight: bold;
                            "
                        >
                            🚀 Apply
                        </a>
                    </td>
                </tr>
            `)
            .join("");

    return `
    <html>
        <head>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    padding: 20px;
                }
                
                .container {
                    background: white;
                    border-radius: 15px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
                    max-width: 900px;
                    margin: 0 auto;
                    overflow: hidden;
                }
                
                .header {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 40px 30px;
                    text-align: center;
                }
                
                .header h1 {
                    font-size: 28px;
                    margin-bottom: 10px;
                    letter-spacing: 1px;
                }
                
                .header p {
                    font-size: 14px;
                    opacity: 0.9;
                }
                
                .stats {
                    display: flex;
                    justify-content: space-around;
                    background: #f8f9fa;
                    padding: 20px;
                    border-bottom: 2px solid #e0e0e0;
                }
                
                .stat-item {
                    text-align: center;
                }
                
                .stat-number {
                    font-size: 24px;
                    font-weight: bold;
                    color: #667eea;
                }
                
                .stat-label {
                    font-size: 12px;
                    color: #666;
                    margin-top: 5px;
                }
                
                .content {
                    padding: 30px;
                }
                
                .jobs-table {
                    width: 100%;
                    border-collapse: collapse;
                }
                
                .jobs-table thead {
                    background: #f8f9fa;
                    border-bottom: 2px solid #667eea;
                }
                
                .jobs-table th {
                    padding: 12px;
                    text-align: left;
                    font-weight: bold;
                    color: #667eea;
                    font-size: 13px;
                    text-transform: uppercase;
                }
                
                .jobs-table tbody tr:hover {
                    background: #f8f9fa;
                }
                
                .footer {
                    background: #f8f9fa;
                    padding: 20px;
                    text-align: center;
                    border-top: 1px solid #e0e0e0;
                    font-size: 12px;
                    color: #666;
                }
                
                .footer-link {
                    color: #667eea;
                    text-decoration: none;
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <div class="container">
                
                <!-- HEADER -->
                <div class="header">
                    <h1>🚀 Your Job Hunt Automation</h1>
                    <p>Your Perfect Job Opportunities Await!</p>
                </div>
                
                <!-- STATS -->
                <div class="stats">
                    <div class="stat-item">
                        <div class="stat-number">${data.matchedJobs.length}</div>
                        <div class="stat-label">Matching Jobs</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">✨</div>
                        <div class="stat-label">Fresh Listings</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">🎯</div>
                        <div class="stat-label">Last 7 Days</div>
                    </div>
                </div>
                
                <!-- JOBS TABLE -->
                <div class="content">
                    <table class="jobs-table">
                        <thead>
                            <tr>
                                <th style="width: 5%;">#</th>
                                <th style="width: 30%;">Job Title & Company</th>
                                <th style="width: 20%;">Location</th>
                                <th style="width: 15%;">Posted</th>
                                <th style="width: 30%;">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${jobsHtml}
                        </tbody>
                    </table>
                </div>
                
                <!-- FOOTER -->
                <div class="footer">
                    <p>
                        📧 This email was generated by <strong>Job Hunt Automation</strong>
                    </p>
                    <p style="margin-top: 10px; color: #999;">
                        Keep applying and landing interviews! Good luck! 💪
                    </p>
                </div>
                
            </div>
        </body>
    </html>
    `;
}


module.exports = {
    generateMail
};