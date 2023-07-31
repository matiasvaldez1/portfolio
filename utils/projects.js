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

module.exports = { scrapeGoogleSheet };
