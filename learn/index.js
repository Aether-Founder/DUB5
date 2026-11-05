/* DUB5 Learn - Index Page - Load and Display Subjects */

let curriculum = null;

async function loadCurriculum() {
  try {
    const response = await fetch('curriculum.json');
    curriculum = await response.json();
    renderSubjects();
  } catch (error) {
    console.error('Error loading curriculum:', error);
    document.getElementById('subjectsGrid').innerHTML = '<p style="color: var(--ink-dim);">Er is een fout opgetreden bij het laden van de curriculum.</p>';
  }
}

function renderSubjects() {
  const grid = document.getElementById('subjectsGrid');
  grid.innerHTML = '';

  curriculum.subjects.forEach(subject => {
    const card = document.createElement('div');
    card.className = 'subject-card';
    
    const hasContent = subject.chapters && subject.chapters.length > 0;
    
    card.innerHTML = `
      <div class="subject-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        </svg>
      </div>
      <h3 class="subject-name">${subject.name}</h3>
      <p class="subject-count">${hasContent ? subject.chapters.length + ' hoofdstukken' : 'Inhoud volgt binnenkort'}</p>
      ${hasContent ? '<button class="btn btn-secondary subject-btn">Openen</button>' : '<button class="btn btn-secondary subject-btn" disabled>Binnenkort</button>'}
    `;

    if (hasContent) {
      card.onclick = () => {
        window.location.href = `subject.html?id=${subject.id}`;
      };
    }

    grid.appendChild(card);
  });
}

// Load curriculum on page load
document.addEventListener('DOMContentLoaded', loadCurriculum);
