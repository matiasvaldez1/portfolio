const Papa = require("papaparse");

async function scrapeGoogleSheet(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from Google Sheet. Status: ${response.status} ${response.statusText}`
      );
    }

    const text = await response.text();

    const parsedData = Papa.parse(text, {
      header: true,
    });

    return parsedData.data;
  } catch (error) {
    console.error("Error scraping Google Sheet:", error);
    return null;
  }
}

async function scrapePersonalProjects() {
  const url = process.env.NEXT_PUBLIC_LINK_PERSONAL_PROJECTS;
  if (!url || url.includes('your-') || url === 'undefined') {
    console.warn('Personal projects Google Sheet URL not configured');
    return [];
  }
  return await scrapeGoogleSheet(url);
}

async function scrapeProfessionalProjects() {
  const url = process.env.NEXT_PUBLIC_LINK_PROFESSIONAL_PROJECTS;
  if (!url || url.includes('your-') || url === 'undefined') {
    console.warn('Professional projects Google Sheet URL not configured');
    return [];
  }
  return await scrapeGoogleSheet(url);
}

module.exports = { scrapeGoogleSheet, scrapePersonalProjects, scrapeProfessionalProjects };
