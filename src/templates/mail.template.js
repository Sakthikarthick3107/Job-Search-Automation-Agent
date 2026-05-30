const generateMail = (data) => {
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
        
        // Portal header
        portalsHtml += `
            <div class="portal-section">
                <div class="portal-header" style="background-color: ${config.color};">
                    <span class="portal-icon">${config.icon}</span>
                    <span class="portal-name">${source}</span>
                    <span class="portal-count">${jobs.length} jobs</span>
                </div>
                <table style="width: 100%; border-collapse: collapse;">
                    <tbody>
        `;

        // Jobs for this portal
        jobs.forEach(job => {
            portalsHtml += `
                <tr style="border-bottom: 1px solid #eee;">
                    <td style="padding: 10px 8px; font-weight: bold; width: 50%;">
                        <a href="${job.url}" style="color: #333; text-decoration: none; word-break: break-word;">
                            ${job.title}
                        </a>
                    </td>
                    <td style="padding: 10px 8px; font-size: 13px; color: #666; width: 20%;">
                        ${job.company || 'N/A'}
                    </td>
                    <td style="padding: 10px 8px; font-size: 13px; color: #666; width: 15%;">
                        ${job.location || 'N/A'}
                    </td>
                    <td style="padding: 10px 8px; font-size: 12px; text-align: center;">
                        <a href="${job.url}" style="display: inline-block; padding: 6px 12px; background-color: ${config.color}; color: white; text-decoration: none; border-radius: 4px; font-weight: bold;">
                            View
                        </a>
                    </td>
                </tr>
            `;
        });

        portalsHtml += `
                    </tbody>
                </table>
            </div>
        `;
    });

    return `
        <!DOCTYPE html>
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
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                    background-color: #f5f5f5;
                    color: #333;
                    line-height: 1.6;
                }
                
                .email-container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: white;
                    padding: 0;
                }
                
                .header {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 30px 20px;
                    text-align: center;
                }
                
                .header h1 {
                    font-size: 24px;
                    margin-bottom: 10px;
                }
                
                .header p {
                    font-size: 14px;
                    opacity: 0.9;
                }
                
                .content {
                    padding: 30px 20px;
                }
                
                .portal-section {
                    margin-bottom: 25px;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                
                .portal-header {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 15px 20px;
                    color: white;
                    font-weight: bold;
                }
                
                .portal-icon {
                    font-size: 20px;
                }
                
                .portal-name {
                    flex: 1;
                    font-size: 16px;
                }
                
                .portal-count {
                    font-size: 12px;
                    opacity: 0.9;
                    background-color: rgba(255,255,255,0.2);
                    padding: 4px 8px;
                    border-radius: 4px;
                }
                
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                
                tr:last-child {
                    border-bottom: none !important;
                }
                
                a {
                    color: #667eea;
                    text-decoration: none;
                }
                
                a:hover {
                    text-decoration: underline;
                }
                
                .footer {
                    background-color: #f9f9f9;
                    padding: 20px;
                    text-align: center;
                    font-size: 12px;
                    color: #666;
                    border-top: 1px solid #eee;
                }
                
                .resume-link {
                    display: inline-block;
                    margin-top: 10px;
                    padding: 10px 20px;
                    background-color: #667eea;
                    color: white;
                    text-decoration: none;
                    border-radius: 4px;
                    font-weight: bold;
                }
                
                @media (max-width: 600px) {
                    .email-container {
                        width: 100%;
                    }
                    
                    .content {
                        padding: 20px 15px;
                    }
                    
                    .portal-header {
                        flex-wrap: wrap;
                        gap: 8px;
                    }
                    
                    .portal-name {
                        flex: 1 0 100%;
                    }
                    
                    table {
                        font-size: 13px;
                    }
                    
                    td {
                        padding: 8px 5px !important;
                    }
                    
                    a.view-btn {
                        padding: 5px 10px !important;
                        font-size: 11px !important;
                    }
                }
                
                @media (max-width: 480px) {
                    .header h1 {
                        font-size: 20px;
                    }
                    
                    .content {
                        padding: 15px 10px;
                    }
                    
                    table {
                        font-size: 12px;
                    }
                    
                    td {
                        padding: 6px 4px !important;
                    }
                    
                    .portal-header {
                        padding: 12px 15px;
                    }
                    
                    a.view-btn {
                        padding: 4px 8px !important;
                        font-size: 10px !important;
                    }
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <h1>🚀 Your Job Hunt Automation</h1>
                    <p>Fresh Opportunities Found - ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                
                <div class="content">
                    <p style="margin-bottom: 20px;">Hi there!</p>
                    <p style="margin-bottom: 20px;">
                        We've found <strong>${data.matchedJobs.length}</strong> new job opportunities that match your profile across multiple job portals. 
                        Here are the latest positions grouped by job portal:
                    </p>
                    
                    ${portalsHtml}
                    
                    <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                        <strong>📎 Your Resume:</strong><br>
                        <a href="${data.resumeUrl}" class="resume-link">View/Download Resume</a>
                    </p>
                </div>
                
                <div class="footer">
                    <p>This is an automated email from your Job Search Automation Agent.</p>
                    <p>Powered by Node.js & Playwright | Running on GitHub Actions</p>
                    <p style="margin-top: 10px; color: #999;">Last updated: ${new Date().toLocaleString()}</p>
                </div>
            </div>
        </body>
        </html>
    `;
};

module.exports = { generateMail };
