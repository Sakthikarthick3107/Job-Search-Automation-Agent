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

    // Group jobs by portal/source
    const jobsBySource = {};
    data.matchedJobs.forEach(job => {
        const source = job.source || "LinkedIn";
        if (!jobsBySource[source]) {
            jobsBySource[source] = [];
        }
        jobsBySource[source].push(job);
    });

    // Portal icons and colors
    const portalConfig = {
        "LinkedIn": { icon: "💼", color: "#0073b1" },
        "Indeed": { icon: "📋", color: "#003580" },
        "Naukri": { icon: "🇮🇳", color: "#45a029" },
        "Glassdoor": { icon: "💬", color: "#0caa41" },
        "Stack Overflow": { icon: "🖤", color: "#f48024" }
    };

    // Generate portal sections HTML
    let portalsHtml = '';
    Object.entries(jobsBySource).forEach(([source, jobs]) => {
        const config = portalConfig[source] || { icon: "📱", color: "#667eea" };
        
        const jobsRows = jobs
            .map((job, idx) => `
                <tr>
                    <td class="job-cell" style="font-weight: bold; color: ${config.color}; text-align: center; width: 8%;">
                        ${idx + 1}
                    </td>
                    <td class="job-cell" style="width: 50%;">
                        <div class="job-title">${job.title}</div>
                        <div class="job-company">${job.company}</div>
                    </td>
                    <td class="job-cell" style="width: 18%;">
                        <div class="job-location">📍 ${job.location || "N/A"}</div>
                    </td>
                    <td class="job-cell" style="width: 10%;">
                        <div class="job-posted">🕐 ${job.posted || "N/A"}</div>
                    </td>
                    <td class="job-cell" style="text-align: center; width: 14%; vertical-align: middle;">
                        <a href="${job.url}" target="_blank" class="apply-btn" style="background: ${config.color};">
                            🚀 Apply
                        </a>
                    </td>
                </tr>
            `)
            .join("");

        portalsHtml += `
            <div class="portal-section">
                <div class="portal-header" style="background: ${config.color}; color: white;">
                    <span class="portal-icon">${config.icon}</span>
                    <span class="portal-name">${source}</span>
                    <span class="portal-count">${jobs.length} jobs</span>
                </div>
                <table class="jobs-table">
                    <thead>
                        <tr>
                            <th style="width: 8%;">#</th>
                            <th style="width: 50%;">Job Title & Company</th>
                            <th style="width: 18%;">Location</th>
                            <th style="width: 10%;">Posted</th>
                            <th style="width: 14%;">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${jobsRows}
                    </tbody>
                </table>
            </div>
        `;
    });

    return `
    <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    padding: 10px;
                }
                
                .container {
                    background: white;
                    border-radius: 15px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
                    max-width: 100%;
                    width: 100%;
                    margin: 0 auto;
                    overflow: hidden;
                }
                
                .header {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 30px 20px;
                    text-align: center;
                }
                
                .header h1 {
                    font-size: 24px;
                    margin-bottom: 8px;
                    letter-spacing: 1px;
                }
                
                .header p {
                    font-size: 13px;
                    opacity: 0.9;
                }
                
                .stats {
                    display: flex;
                    justify-content: space-around;
                    background: #f8f9fa;
                    padding: 15px;
                    border-bottom: 2px solid #e0e0e0;
                    flex-wrap: wrap;
                    gap: 10px;
                }
                
                .stat-item {
                    text-align: center;
                    flex: 1;
                    min-width: 80px;
                }
                
                .stat-number {
                    font-size: 20px;
                    font-weight: bold;
                    color: #667eea;
                }
                
                .stat-label {
                    font-size: 11px;
                    color: #666;
                    margin-top: 3px;
                }
                
                .content {
                    padding: 15px;
                    overflow-x: auto;
                }
                
                .jobs-table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 14px;
                }
                
                .jobs-table thead {
                    background: #f8f9fa;
                    border-bottom: 2px solid #667eea;
                }
                
                .jobs-table th {
                    padding: 10px 8px;
                    text-align: left;
                    font-weight: bold;
                    color: #667eea;
                    font-size: 12px;
                    text-transform: uppercase;
                }
                
                .jobs-table tbody tr:hover {
                    background: #f8f9fa;
                }
                
                .job-cell {
                    padding: 12px 8px;
                    border-bottom: 1px solid #e0e0e0;
                }
                
                .job-title {
                    font-weight: bold;
                    color: #333;
                    font-size: 13px;
                    line-height: 1.4;
                    word-break: break-word;
                }
                
                .job-company {
                    color: #666;
                    font-size: 11px;
                    margin-top: 3px;
                }
                
                .job-source {
                    color: #999;
                    font-size: 10px;
                    margin-top: 2px;
                }
                
                .job-location {
                    color: #666;
                    font-size: 12px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                
                .job-posted {
                    color: #666;
                    font-size: 12px;
                    white-space: nowrap;
                }
                
                .apply-btn {
                    display: inline-block;
                    padding: 6px 10px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                    font-size: 11px;
                    font-weight: bold;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    max-width: 100%;
                }
                
                /* Portal Section Styles */
                .portal-section {
                    margin-bottom: 20px;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }
                
                .portal-header {
                    padding: 12px 15px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-weight: bold;
                    font-size: 14px;
                }
                
                .portal-icon {
                    font-size: 18px;
                }
                
                .portal-name {
                    flex: 1;
                }
                
                .portal-count {
                    background: rgba(255,255,255,0.3);
                    padding: 2px 8px;
                    border-radius: 12px;
                    font-size: 12px;
                }
                
                .footer {
                    background: #f8f9fa;
                    padding: 15px;
                    text-align: center;
                    border-top: 1px solid #e0e0e0;
                    font-size: 11px;
                    color: #666;
                }
                
                .footer-link {
                    color: #667eea;
                    text-decoration: none;
                    font-weight: bold;
                }
                
                /* Mobile Responsive */
                @media (max-width: 600px) {
                    body {
                        padding: 5px;
                    }
                    
                    .container {
                        border-radius: 10px;
                    }
                    
                    .header {
                        padding: 20px 15px;
                    }
                    
                    .header h1 {
                        font-size: 20px;
                    }
                    
                    .header p {
                        font-size: 12px;
                    }
                    
                    .stats {
                        padding: 12px;
                        gap: 8px;
                    }
                    
                    .stat-number {
                        font-size: 18px;
                    }
                    
                    .stat-label {
                        font-size: 10px;
                    }
                    
                    .content {
                        padding: 12px;
                    }
                    
                    .jobs-table {
                        font-size: 12px;
                    }
                    
                    .jobs-table th {
                        padding: 8px 6px;
                        font-size: 10px;
                    }
                    
                    .job-cell {
                        padding: 10px 6px;
                    }
                    
                    .job-title {
                        font-size: 12px;
                    }
                    
                    .job-company {
                        font-size: 10px;
                    }
                    
                    .job-source {
                        font-size: 9px;
                    }
                    
                    .job-location {
                        font-size: 11px;
                    }
                    
                    .job-posted {
                        font-size: 11px;
                    }
                    
                    .apply-btn {
                        padding: 5px 8px;
                        font-size: 9px;
                    }
                    
                    .footer {
                        padding: 12px;
                        font-size: 10px;
                    }
                }
                
                @media (max-width: 480px) {
                    .jobs-table th:nth-child(3),
                    .jobs-table th:nth-child(4) {
                        display: none;
                    }
                    
                    .jobs-table td:nth-child(3),
                    .jobs-table td:nth-child(4) {
                        display: none;
                    }
                    
                    .job-cell {
                        padding: 8px 4px;
                    }
                    
                    .apply-btn {
                        padding: 4px 6px;
                        font-size: 8px;
                    }
                }
            </style>
        </head>
        <body>
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
                                <th style="width: 8%;">#</th>
                                <th style="width: 50%;">Job Title & Company</th>
                                <th style="width: 18%;">Location</th>
                                <th style="width: 10%;">Posted</th>
                                <th style="width: 14%;">Action</th>
                            </tr>
                        </thead>
                            ${portalsHtml}
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