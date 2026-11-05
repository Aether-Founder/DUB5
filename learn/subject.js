/* DUB5 Learn - Subject Page - Load and Display Chapters */

let curriculum = null;
let currentSubject = null;

async function loadCurriculum() {
  try {
    const response = await fetch('curriculum.json');
    curriculum = await response.json();
    
    const urlParams = new URLSearchParams(window.location.search);
    const subjectId = urlParams.get('id');
    
    if (subjectId) {
      currentSubject = curriculum.subjects.find(s => s.id === subjectId);
      if (currentSubject) {
        renderSubject();
      } else {
        document.getElementById('chaptersGrid').innerHTML = '<p style="color: var(--ink-dim);">Vak niet gevonden.</p>';
      }
    } else {
      window.location.href = '/learn';
    }
  } catch (error) {
    console.error('Error loading curriculum:', error);
    document.getElementById('chaptersGrid').innerHTML = '<p style="color: var(--ink-dim);">Er is een fout opgetreden bij het laden.</p>';
  }
}

function renderSubject() {
  document.getElementById('breadcrumbSubject').textContent = currentSubject.name;
  document.getElementById('subjectTitle').textContent = currentSubject.name;
  
  const hasContent = currentSubject.chapters && currentSubject.chapters.length > 0;
  document.getElementById('subjectDescription').textContent = hasContent 
    ? `${currentSubject.chapters.length} hoofdstukken beschikbaar`
    : 'Inhoud volgt binnenkort';

  const grid = document.getElementById('chaptersGrid');
  grid.innerHTML = '';

  if (!hasContent) {
    grid.innerHTML = '<p style="color: var(--ink-dim); padding: 2rem;">Inhoud voor dit vak volgt binnenkort.</p>';
    return;
  }

  currentSubject.chapters.forEach(chapter => {
    const card = document.createElement('div');
    card.className = 'chapter-card';
    
    const hasParagraphs = chapter.paragraphs && chapter.paragraphs.length > 0;
    
    card.innerHTML = `
      <div class="chapter-number">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        </svg>
      </div>
      <div class="chapter-info">
        <h3 class="chapter-name">${chapter.name}</h3>
        <p class="chapter-count">${hasParagraphs ? chapter.paragraphs.length + ' paragrafen' : 'Geen inhoud'}</p>
      </div>
      ${hasParagraphs ? '<button class="btn btn-secondary chapter-btn">Bekijken</button>' : '<button class="btn btn-secondary chapter-btn" disabled>Binnenkort</button>'}
    `;

    if (hasParagraphs) {
      card.onclick = () => {
        window.location.href = `chapter.html?subject=${currentSubject.id}&chapter=${chapter.id}`;
      };
    }

    grid.appendChild(card);
  });
}

// Load curriculum on page load
document.addEventListener('DOMContentLoaded', loadCurriculum);
