// Helper to format ISO date string into a human‑readable form
function formatDate(isoString) {
  try {
    const date = new Date(isoString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch (e) {
    return isoString;
  }
}

// Fetches news articles from a Netlify function endpoint
async function fetchNews(endpoint, listElement) {
  listElement.innerHTML = '<li class="loading">Fetching latest news…</li>';
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    const articles = await response.json();
    if (!Array.isArray(articles) || articles.length === 0) {
      listElement.innerHTML = '<li>No recent articles found.</li>';
      return;
    }
    // Build HTML list
    listElement.innerHTML = '';
    articles.forEach((article) => {
      const li = document.createElement('li');
      const anchor = document.createElement('a');
      anchor.href = article.link;
      anchor.target = '_blank';
      anchor.rel = 'noopener';
      anchor.textContent = article.title;
      li.appendChild(anchor);
      const dateSpan = document.createElement('span');
      dateSpan.className = 'news-date';
      dateSpan.textContent = formatDate(article.date);
      li.appendChild(dateSpan);
      if (article.excerpt) {
        const excerptPara = document.createElement('p');
        excerptPara.textContent = article.excerpt;
        li.appendChild(excerptPara);
      }
      listElement.appendChild(li);
    });
  } catch (error) {
    console.error(error);
    listElement.innerHTML = `<li>Failed to load news: ${error.message}</li>`;
  }
}

// Initialize the page by fetching both lists
function init() {
  const lossesList = document.getElementById('losses-list');
  const mergersList = document.getElementById('mergers-list');
  const refreshLossesBtn = document.getElementById('refresh-losses');
  const refreshMergersBtn = document.getElementById('refresh-mergers');

  // Define endpoints relative to Netlify functions
  const lossesEndpoint = '/.netlify/functions/major-losses';
  const mergersEndpoint = '/.netlify/functions/mergers-acquisitions';

  // Fetch on load
  fetchNews(lossesEndpoint, lossesList);
  fetchNews(mergersEndpoint, mergersList);

  // Attach refresh handlers
  refreshLossesBtn.addEventListener('click', () => {
    fetchNews(lossesEndpoint, lossesList);
  });
  refreshMergersBtn.addEventListener('click', () => {
    fetchNews(mergersEndpoint, mergersList);
  });
}

// Run init when DOM is ready
document.addEventListener('DOMContentLoaded', init);