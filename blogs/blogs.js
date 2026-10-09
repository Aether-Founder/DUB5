async function loadResearchData() {
  try {
    const response = await fetch('/api/blogs');
    if (!response.ok) throw new Error('Failed to load blogs data');
    return await response.json();
  } catch (error) {
    console.error('Error loading blogs data:', error);
    return null;
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

function getImpactBadge(level) {
  const badges = {
    critical: 'badge-impact-high',
    high: 'badge-impact-high',
    medium: 'badge-impact-medium',
    low: 'badge-impact-low'
  };
  return badges[level] || 'badge-impact-low';
}

function createPostCard(post) {
  const card = document.createElement('a');
  card.href = `/blogs/${post.slug}`;
  card.className = 'post-card';

  const badgesHtml = `
    <div class="post-badges">
      ${post.isFeatured ? '<span class="badge badge-featured">Uitgelicht</span>' : ''}
      <span class="badge badge-category">${post.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
      <span class="badge ${getImpactBadge(post.impactLevel)}">${post.impactLevel.charAt(0).toUpperCase() + post.impactLevel.slice(1)} Impact</span>
    </div>
  `;

  const platformTagsHtml = post.platforms.slice(0, 3).map(p => 
    `<span class="platform-tag">${p.charAt(0).toUpperCase() + p.slice(1)}</span>`
  ).join('');

  card.innerHTML = `
    ${badgesHtml}
    <h2 class="post-title">${post.title}</h2>
    <p class="post-summary">${post.summary}</p>
    <div class="platform-tags">${platformTagsHtml}</div>
    <div class="post-meta">
      <div class="post-meta-item">📅 ${formatDate(post.publishedAt)}</div>
      <div class="post-meta-item">⏱️ ${post.readingTime} min</div>
    </div>
  `;

  return card;
}

function filterPosts(posts, filters) {
  let filtered = [...posts];

  if (filters.search) {
    const query = filters.search.toLowerCase();
    filtered = filtered.filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.summary.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }

  if (filters.category !== 'all') {
    filtered = filtered.filter(post => post.category === filters.category);
  }

  if (filters.platform !== 'all') {
    filtered = filtered.filter(post => post.platforms.includes(filters.platform));
  }

  if (filters.topic !== 'all') {
    filtered = filtered.filter(post => post.topics.includes(filters.topic));
  }

  switch (filters.sort) {
    case 'newest':
      filtered.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
      break;
    case 'alphabetical':
      filtered.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'featured':
      filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
      break;
  }

  return filtered;
}

function populateFilters(data) {
  const categorySelect = document.getElementById('categoryFilter');
  const platformSelect = document.getElementById('platformFilter');
  const topicSelect = document.getElementById('topicFilter');

  data.categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat.id;
    option.textContent = cat.name;
    categorySelect.appendChild(option);
  });

  data.platforms.forEach(plat => {
    const option = document.createElement('option');
    option.value = plat.id;
    option.textContent = plat.name;
    platformSelect.appendChild(option);
  });

  data.topics.forEach(topic => {
    const option = document.createElement('option');
    option.value = topic.id;
    option.textContent = topic.name;
    topicSelect.appendChild(option);
  });
}

async function init() {
  const grid = document.getElementById('postsGrid');
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const platformFilter = document.getElementById('platformFilter');
  const topicFilter = document.getElementById('topicFilter');
  const sortFilter = document.getElementById('sortFilter');

  const data = await loadResearchData();
  if (!data) {
    grid.innerHTML = '<div class="error">Kon research data niet laden. Probeer de pagina te verversen.</div>';
    return;
  }

  populateFilters(data);

  let currentFilters = {
    search: '',
    category: 'all',
    platform: 'all',
    topic: 'all',
    sort: 'newest'
  };

  function render() {
    const filtered = filterPosts(data.posts, currentFilters);
    
    if (filtered.length === 0) {
      grid.innerHTML = '<div class="empty">Geen research posts gevonden die aan je filters voldoen.</div>';
      return;
    }

    grid.innerHTML = '';
    filtered.forEach(post => {
      grid.appendChild(createPostCard(post));
    });
  }

  searchInput.addEventListener('input', (e) => {
    currentFilters.search = e.target.value;
    render();
  });

  categoryFilter.addEventListener('change', (e) => {
    currentFilters.category = e.target.value;
    render();
  });

  platformFilter.addEventListener('change', (e) => {
    currentFilters.platform = e.target.value;
    render();
  });

  topicFilter.addEventListener('change', (e) => {
    currentFilters.topic = e.target.value;
    render();
  });

  sortFilter.addEventListener('change', (e) => {
    currentFilters.sort = e.target.value;
    render();
  });

  render();
}

document.addEventListener('DOMContentLoaded', init);
