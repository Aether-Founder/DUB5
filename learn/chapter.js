/* DUB5 Learn - Chapter Page - Load and Display Paragraphs */

let curriculum = null;
let currentSubject = null;
let currentChapter = null;

async function loadCurriculum() {
  try {
    const response = await fetch('curriculum.json');
    curriculum = await response.json();
    
    const urlParams = new URLSearchParams(window.location.search);
    const subjectId = urlParams.get('subject');
    const chapterId = urlParams.get('chapter');
    
    if (subjectId && chapterId) {
      currentSubject = curriculum.subjects.find(s => s.id === subjectId);
      if (currentSubject) {
        currentChapter = currentSubject.chapters.find(c => c.id === chapterId);
        if (currentChapter) {
          renderChapter();
        } else {
          document.getElementById('paragraphsGrid').innerHTML = '<p style="color: var(--ink-dim);">Hoofdstuk niet gevonden.</p>';
        }
      } else {
        document.getElementById('paragraphsGrid').innerHTML = '<p style="color: var(--ink-dim);">Vak niet gevonden.</p>';
      }
    } else {
      window.location.href = '/learn';
    }
  } catch (error) {
    console.error('Error loading curriculum:', error);
    document.getElementById('paragraphsGrid').innerHTML = '<p style="color: var(--ink-dim);">Er is een fout opgetreden bij het laden.</p>';
  }
}

function renderChapter() {
  document.getElementById('breadcrumbSubject').textContent = currentSubject.name;
  document.getElementById('breadcrumbSubject').href = `subject.html?id=${currentSubject.id}`;
  document.getElementById('breadcrumbChapter').textContent = currentChapter.name;
  document.getElementById('chapterTitle').textContent = currentChapter.name;
  
  const hasParagraphs = currentChapter.paragraphs && currentChapter.paragraphs.length > 0;
  document.getElementById('chapterDescription').textContent = hasContent 
    ? `${currentChapter.paragraphs.length} paragrafen beschikbaar`
    : 'Geen inhoud';

  const grid = document.getElementById('paragraphsGrid');
  grid.innerHTML = '';

  if (!hasParagraphs) {
    grid.innerHTML = '<p style="color: var(--ink-dim); padding: 2rem;">Geen inhoud beschikbaar voor dit hoofdstuk.</p>';
    return;
  }

  currentChapter.paragraphs.forEach(paragraph => {
    const card = document.createElement('div');
    card.className = 'paragraph-card';
    
    const hasLesson = paragraph.lessonPage;
    const hasLearningSet = paragraph.learningSet;
    
    let badges = '';
    if (hasLesson) badges += '<span class="content-badge lesson-badge">Theorie</span>';
    if (hasLearningSet) badges += '<span class="content-badge practice-badge">Oefenen</span>';
    
    card.innerHTML = `
      <div class="paragraph-info">
        <h3 class="paragraph-name">${paragraph.name}</h3>
        <div class="paragraph-badges">${badges}</div>
      </div>
      <div class="paragraph-actions">
        ${hasLesson ? '<button class="btn btn-secondary" onclick="openLesson()">Theorie bekijken</button>' : ''}
        ${hasLearningSet ? '<button class="btn btn-primary" onclick="openLearningSet()">Oefenen</button>' : ''}
      </div>
    `;

    // Store data for button clicks
    card.dataset.subjectId = currentSubject.id;
    card.dataset.chapterId = currentChapter.id;
    card.dataset.paragraphId = paragraph.id;

    grid.appendChild(card);
  });
}

function openLesson() {
  const card = event.target.closest('.paragraph-card');
  const subjectId = card.dataset.subjectId;
  const chapterId = card.dataset.chapterId;
  const paragraphId = card.dataset.paragraphId;
  window.location.href = `lesson.html?subject=${subjectId}&chapter=${chapterId}&paragraph=${paragraphId}`;
}

function openLearningSet() {
  const card = event.target.closest('.paragraph-card');
  const subjectId = card.dataset.subjectId;
  const chapterId = card.dataset.chapterId;
  const paragraphId = card.dataset.paragraphId;
  window.location.href = `session.html?subject=${subjectId}&chapter=${chapterId}&paragraph=${paragraphId}`;
}

// Load curriculum on page load
document.addEventListener('DOMContentLoaded', loadCurriculum);
