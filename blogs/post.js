async function loadPostData(slug) {
  try {
    const response = await fetch(`/api/blogs/${slug}`);
    if (!response.ok) throw new Error('Failed to load post');
    return await response.json();
  } catch (error) {
    console.error('Error loading post:', error);
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

function renderSection(section) {
  switch (section.type) {
    case 'markdown':
      return `
        <div class="section" id="${section.id}">
          ${renderMarkdown(section.content)}
        </div>
      `;
    case 'callout':
      const variantClass = section.variant ? `callout-${section.variant}` : 'callout-info';
      return `
        <div class="callout ${variantClass}" id="${section.id}">
          ${section.title ? `<h3>${section.title}</h3>` : ''}
          <p>${section.content}</p>
        </div>
      `;
    case 'codeblock':
      return `
        <div class="section" id="${section.id}">
          ${section.title ? `<h3>${section.title}</h3>` : ''}
          <div class="code-block">
            <div class="code-header">
              <span class="code-language">${section.language || 'code'}</span>
              ${section.filename ? `<span class="code-filename">${section.filename}</span>` : ''}
              <button class="code-copy" onclick="copyCode(this)">Copy</button>
            </div>
            <pre><code class="language-${section.language || 'plaintext'}">${escapeHtml(section.content)}</code></pre>
          </div>
        </div>
      `;
    case 'terminal':
      return `
        <div class="section" id="${section.id}">
          ${section.title ? `<h3>${section.title}</h3>` : ''}
          <div class="terminal-block">
            <div class="terminal-header">
              <span class="terminal-os">${section.os || 'Terminal'}</span>
              ${section.warning ? `<span class="terminal-warning">⚠️ ${section.warning}</span>` : ''}
              <button class="terminal-copy" onclick="copyCode(this)">Copy</button>
            </div>
            <pre><code>${escapeHtml(section.content)}</code></pre>
          </div>
        </div>
      `;
    case 'json':
      return `
        <div class="section" id="${section.id}">
          ${section.title ? `<h3>${section.title}</h3>` : ''}
          <div class="json-viewer">
            <div class="json-header">
              <span class="json-label">JSON</span>
              <button class="json-copy" onclick="copyCode(this)">Copy</button>
              <button class="json-raw" onclick="toggleJsonRaw(this)">View Raw</button>
            </div>
            <pre class="json-tree"><code>${escapeHtml(JSON.stringify(section.content, null, 2))}</code></pre>
            <pre class="json-raw-content" style="display:none;"><code>${escapeHtml(JSON.stringify(section.content))}</code></pre>
          </div>
        </div>
      `;
    case 'image':
      return `
        <div class="section" id="${section.id}">
          ${section.title ? `<h3>${section.title}</h3>` : ''}
          <div class="image-container">
            <img src="${section.src}" alt="${section.alt || section.title}" loading="lazy">
            ${section.caption ? `<p class="image-caption">${section.caption}</p>` : ''}
          </div>
        </div>
      `;
    case 'video':
      return `
        <div class="section" id="${section.id}">
          ${section.title ? `<h3>${section.title}</h3>` : ''}
          <div class="video-container">
            <video controls poster="${section.poster || ''}">
              <source src="${section.src}" type="${section.type || 'video/mp4'}">
              Your browser does not support the video tag.
            </video>
            ${section.caption ? `<p class="video-caption">${section.caption}</p>` : ''}
          </div>
        </div>
      `;
    case 'file':
      return `
        <div class="section" id="${section.id}">
          ${section.title ? `<h3>${section.title}</h3>` : ''}
          <div class="file-artifact">
            <div class="file-icon">📄</div>
            <div class="file-info">
              <div class="file-name">${section.filename}</div>
              <div class="file-meta">
                <span class="file-type">${section.type || 'File'}</span>
                ${section.size ? `<span class="file-size">${section.size}</span>` : ''}
              </div>
              ${section.description ? `<p class="file-description">${section.description}</p>` : ''}
            </div>
            <div class="file-actions">
              <button class="file-preview" onclick="previewFile('${section.id}')">Preview</button>
              <button class="file-download" onclick="downloadFile('${section.id}')">Download</button>
            </div>
          </div>
        </div>
      `;
    case 'artifact':
      return `
        <div class="section" id="${section.id}">
          ${section.title ? `<h3>${section.title}</h3>` : ''}
          <div class="artifacts-section">
            ${section.items.map(item => `
              <div class="artifact-card" data-artifact-id="${item.id}">
                <div class="artifact-icon">${item.icon || '📄'}</div>
                <div class="artifact-info">
                  <div class="artifact-name">${item.name}</div>
                  <div class="artifact-meta">
                    <span class="artifact-type">${item.type}</span>
                    ${item.size ? `<span class="artifact-size">${item.size}</span>` : ''}
                  </div>
                  ${item.sensitivity ? `<span class="artifact-sensitivity">${item.sensitivity}</span>` : ''}
                </div>
                <div class="artifact-actions">
                  <button class="artifact-preview" onclick="previewArtifact('${item.id}')">Preview</button>
                  <button class="artifact-download" onclick="downloadArtifact('${item.id}')">Download</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    default:
      return `<div class="section" id="${section.id}">${section.content}</div>`;
  }
}

function renderMarkdown(content) {
  // Simple markdown parser for headings, paragraphs, lists, code blocks
  let html = content;
  
  // Code blocks
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    return `<pre><code>${escapeHtml(code.trim())}</code></pre>`;
  });
  
  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // Headers
  html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gm, '<h2>$1</h2>');
  
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Lists
  html = html.replace(/^- (.*$)/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');
  
  // Numbered lists
  html = html.replace(/^\d+\. (.*$)/gm, '<li>$1</li>');
  
  // Paragraphs
  html = html.replace(/\n\n/g, '</p><p>');
  html = `<p>${html}</p>`;
  
  // Clean up empty paragraphs
  html = html.replace(/<p><\/p>/g, '');
  html = html.replace(/<p>(<h[23]>)/g, '$1');
  html = html.replace(/(<\/h[23]>)<\/p>/g, '$1');
  html = html.replace(/<p>(<ul>)/g, '$1');
  html = html.replace(/(<\/ul>)<\/p>/g, '$1');
  html = html.replace(/<p>(<pre>)/g, '$1');
  html = html.replace(/(<\/pre>)<\/p>/g, '$1');
  html = html.replace(/<p>(<div)/g, '$1');
  html = html.replace(/(<\/div>)<\/p>/g, '$1');
  
  return html;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function copyCode(button) {
  const codeBlock = button.closest('.code-block, .terminal-block, .json-viewer').querySelector('code');
  const text = codeBlock.textContent;
  navigator.clipboard.writeText(text).then(() => {
    button.textContent = 'Copied!';
    setTimeout(() => button.textContent = 'Copy', 2000);
  });
}

function toggleJsonRaw(button) {
  const container = button.closest('.json-viewer');
  const tree = container.querySelector('.json-tree');
  const raw = container.querySelector('.json-raw-content');
  
  if (raw.style.display === 'none') {
    raw.style.display = 'block';
    tree.style.display = 'none';
    button.textContent = 'View Tree';
  } else {
    raw.style.display = 'none';
    tree.style.display = 'block';
    button.textContent = 'View Raw';
  }
}

function previewFile(id) {
  alert(`Preview file: ${id} (Modal implementation needed)`);
}

function downloadFile(id) {
  alert(`Download file: ${id} (Download implementation needed)`);
}

function previewArtifact(id) {
  alert(`Preview artifact: ${id} (Modal implementation needed)`);
}

function downloadArtifact(id) {
  alert(`Download artifact: ${id} (Download implementation needed)`);
}

async function init() {
  const contentWrapper = document.getElementById('contentWrapper');
  const slug = window.location.pathname.split('/').pop();

  const post = await loadPostData(slug);
  if (!post) {
    contentWrapper.innerHTML = '<div class="error">Kon post niet laden. Probeer de pagina te verversen.</div>';
    return;
  }

  const badgesHtml = `
    <div class="post-badges">
      <span class="badge badge-category">${post.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
      <span class="badge">${post.statusBadge}</span>
      ${post.isFeatured ? '<span class="badge badge-featured">Uitgelicht</span>' : ''}
    </div>
  `;

  const platformTagsHtml = post.platforms.map(p => 
    `<span class="platform-tag">${p.charAt(0).toUpperCase() + p.slice(1)}</span>`
  ).join('');

  const topicTagsHtml = post.topics.map(t => 
    `<span class="platform-tag">${t.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>`
  ).join('');

  const quickFactsHtml = Object.entries(post.quickFacts)
    .filter(([_, value]) => value)
    .map(([key, value]) => `
      <div class="quick-fact">
        <dt>${key.replace(/([A-Z])/g, ' $1').trim()}</dt>
        <dd>${value}</dd>
      </div>
    `).join('');

  const tocHtml = post.tableOfContents.map(item => `
    <li><a href="#${item.id}">${item.title}</a></li>
  `).join('');

  const sectionsHtml = post.sections.map(section => renderSection(section)).join('');

  const referencesHtml = post.references.length > 0 ? `
    <div class="section">
      <h2>Referenties</h2>
      <ul>
        ${post.references.map(ref => `
          <li><a href="${ref.url}" target="_blank" rel="noopener noreferrer">${ref.title}</a></li>
        `).join('')}
      </ul>
    </div>
  ` : '';

  contentWrapper.innerHTML = `
    <div class="main-content">
      <div class="breadcrumb">
        <a href="/blogs">Blogs</a> / <span>${post.title}</span>
      </div>

      <div class="post-header">
        ${badgesHtml}
        <h1>${post.title}</h1>
        <p class="subtitle">${post.subtitle}</p>
        <p class="summary">${post.summary}</p>
        <div class="post-meta">
          <div class="post-meta-item">📅 Gepubliceerd: ${formatDate(post.publishedAt)}</div>
          <div class="post-meta-item">⏱️ ${post.readingTime} min leestijd</div>
          ${post.updatedAt !== post.publishedAt ? `<div class="post-meta-item">Bijgewerkt: ${formatDate(post.updatedAt)}</div>` : ''}
        </div>
        <div class="platform-tags">${platformTagsHtml}</div>
        <div class="platform-tags">${topicTagsHtml}</div>
      </div>

      <div class="ethical-notice">
        <h3>Ethical Notice</h3>
        <p>${post.ethicalNotice}</p>
      </div>

      ${sectionsHtml}
      ${referencesHtml}
    </div>

    <div class="sidebar">
      <div class="quick-facts">
        <h3>Quick Facts</h3>
        ${quickFactsHtml}
      </div>

      <div class="toc">
        <h3>Inhoudsopgave</h3>
        <ul>
          ${tocHtml}
        </ul>
      </div>
    </div>
  `;

  // Add smooth scroll for TOC links
  document.querySelectorAll('.toc a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        // Close mobile drawer if open
        closeTocDrawer();
      }
    });
  });

  // Mobile TOC drawer functionality
  const tocToggle = document.getElementById('tocToggle');
  const tocDrawer = document.getElementById('tocDrawer');
  const tocOverlay = document.getElementById('tocOverlay');
  const tocClose = document.getElementById('tocClose');
  const mobileToc = document.getElementById('mobileToc');

  // Clone TOC to mobile drawer
  const desktopToc = document.querySelector('.toc');
  if (desktopToc && mobileToc) {
    mobileToc.innerHTML = desktopToc.innerHTML;
  }

  function openTocDrawer() {
    tocDrawer.classList.add('open');
    tocOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeTocDrawer() {
    tocDrawer.classList.remove('open');
    tocOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (tocToggle) {
    tocToggle.addEventListener('click', openTocDrawer);
  }

  if (tocClose) {
    tocClose.addEventListener('click', closeTocDrawer);
  }

  if (tocOverlay) {
    tocOverlay.addEventListener('click', closeTocDrawer);
  }

  // Mobile TOC links
  mobileToc.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        closeTocDrawer();
      }
    });
  });

  // Active section highlighting
  const sections = document.querySelectorAll('.section[id]');
  const tocLinks = document.querySelectorAll('.toc a, #mobileToc a');

  function updateActiveToc() {
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        tocLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveToc);
  updateActiveToc(); // Initial check
}

document.addEventListener('DOMContentLoaded', init);
