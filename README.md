# Web Scraping Restaurants Information with Puppeteer

This script utilizes Puppeteer, a Node library which provides a high-level API over the Chrome DevTools Protocol, to scrape restaurant information from a webpage.

## Prerequisites

Before running this script, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)

## Installation

1. Clone or download this repository to your local machine.
2. Navigate to the directory where you cloned/downloaded the repository.
3. Install dependencies by running:
   ```bash
   npm install
   ```

## Usage

To run the script:

```bash
node index.js
```

This will launch a headless browser instance, navigate to the specified webpage, scrape restaurant information, and save it to a CSV file named `restaurants.csv`.

## Description

- The script launches a headless browser using Puppeteer.
- It navigates to the Kakao Maps webpage where the restaurant information is located.
- Upon reaching the webpage, it waits for the restaurant list to be loaded.
- It then scrapes information for each restaurant listed, including name, URL, score, and phone number.
- The scraped data is stored in an array of objects.
- Finally, the data is formatted into a CSV string and saved to a file named `restaurants.csv`.

## Configuration

- You can modify the URL in the `page.goto()` function to scrape restaurant information from a different webpage.
- Adjust the CSS selectors in the `page.evaluate()` function to match the structure of the webpage you're scraping.

## Dependencies

- [puppeteer](https://www.npmjs.com/package/puppeteer) - Headless Chrome Node API
- [fs](https://nodejs.org/api/fs.html) - File system module

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---