const fetch = require('node-fetch');

/**
 * Strips basic HTML tags from a string. This helps convert WordPress excerpts
 * into plain text. It's not a full HTML sanitizer but sufficient for our needs.
 * @param {string} html
 * @returns {string}
 */
function stripHtml(html) {
  return html.replace(/<[^>]*>/g, '').replace(/\n+/g, ' ').trim();
}

exports.handler = async function handler() {
  const tagId = 1030; // WordPress tag ID for loss events on Reinsurance News
  const perPage = 8;
  const url = `https://www.reinsurancene.ws/wp-json/wp/v2/posts?tags=${tagId}&per_page=${perPage}&_fields=title,link,date,excerpt`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `Failed to fetch data: ${response.statusText}` }),
      };
    }
    const data = await response.json();
    const articles = data.map((post) => {
      return {
        title: post.title && post.title.rendered ? post.title.rendered : '',
        link: post.link,
        date: post.date,
        excerpt: post.excerpt && post.excerpt.rendered ? stripHtml(post.excerpt.rendered) : '',
      };
    });
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(articles),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || 'Unknown error' }),
    };
  }
};