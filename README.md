# Insurance & Reinsurance Intelligence Dashboard

This project is a lightweight dashboard for keeping track of the latest **major loss events** and **mergers & acquisitions** in the insurance and reinsurance sectors.  It pulls recent articles from the publicly available WordPress API on [Reinsurance News](https://www.reinsurancene.ws) and displays them in a clean, two–column layout.  A refresh button on each panel triggers a new fetch so users can check for updates at any time.

## Running locally

1. Ensure you have [Node.js](https://nodejs.org/) installed.  The functions rely on the `node-fetch` package, which is declared in `package.json`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Because Netlify Functions run in a serverless environment, the easiest way to test locally is to use the [Netlify CLI](https://docs.netlify.com/cli/get-started/).  After installing it globally (`npm install -g netlify-cli`), run:
   ```bash
   netlify dev
   ```
   This will serve the site and functions on a local dev server.  Open the provided URL in your browser to see the dashboard and verify the functions return data.

If you prefer a simple static preview without the functions, open `index.html` directly in a browser; however, the news lists will not populate because they depend on the Netlify functions.

## Deploying to Netlify

1. Sign in to your [Netlify](https://netlify.com/) account and choose **New site from Git**.
2. Connect the repository containing this project (or drag–and–drop a local folder if using the Netlify UI).
3. Keep the default build command (there isn’t one) and set the publish directory to the root of the repository.
4. Netlify automatically detects the `netlify/functions` folder and provisions the serverless functions.
5. Once deployed, you’ll receive a unique URL.  Share this link with colleagues to provide them with up‑to‑date major loss and M&A intelligence.

## Notes

* Articles are fetched from Reinsurance News using WordPress’s REST API.  We only request the title, link, publication date and excerpt, and we credit the source in the page footer.
* The data is cached for 5 minutes on the function response to prevent hitting the API too aggressively while still keeping information current.

## Privacy & Terms

This dashboard displays publicly available news headlines and short excerpts.  It does not store user data or perform any user‑tracking.