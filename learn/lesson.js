/* DUB5 Learn - Lesson Page - Load and Display Theory Content */

let curriculum = null;
let currentSubject = null;
let currentChapter = null;
let currentParagraph = null;

async function loadCurriculum() {
  try {
    const response = await fetch('curriculum.json');
    curriculum = await response.json();
    
    const urlParams = new URLSearchParams(window.location.search);
    const subjectId = urlParams.get('subject');
    const chapterId = urlParams.get('chapter');
    const paragraphId = urlParams.get('paragraph');
    
    if (subjectId && chapterId && paragraphId) {
      currentSubject = curriculum.subjects.find(s => s.id === subjectId);
      if (currentSubject) {
        currentChapter = currentSubject.chapters.find(c => c.id === chapterId);
        if (currentChapter) {
          currentParagraph = currentChapter.paragraphs.find(p => p.id === paragraphId);
          if (currentParagraph && currentParagraph.lessonPage) {
            renderLesson();
          } else {
            document.getElementById('textbookSectionsContainer').innerHTML = '<p style="color: var(--ink-dim); padding: 2rem;">Geen theorie beschikbaar voor deze paragraaf.</p>';
          }
        } else {
          document.getElementById('textbookSectionsContainer').innerHTML = '<p style="color: var(--ink-dim); padding: 2rem;">Hoofdstuk niet gevonden.</p>';
        }
      } else {
        document.getElementById('textbookSectionsContainer').innerHTML = '<p style="color: var(--ink-dim); padding: 2rem;">Vak niet gevonden.</p>';
      }
    } else {
      window.location.href = '/learn';
    }
  } catch (error) {
    console.error('Error loading curriculum:', error);
    document.getElementById('textbookSectionsContainer').innerHTML = '<p style="color: var(--ink-dim); padding: 2rem;">Er is een fout opgetreden bij het laden.</p>';
  }
}

function renderLesson() {
  const lesson = currentParagraph.lessonPage;
  
  // Update breadcrumb
  document.getElementById('breadcrumbSubject').textContent = currentSubject.name;
  document.getElementById('breadcrumbSubject').href = `subject.html?id=${currentSubject.id}`;
  document.getElementById('breadcrumbChapter').textContent = currentChapter.name;
  document.getElementById('breadcrumbChapter').href = `chapter.html?subject=${currentSubject.id}&chapter=${currentChapter.id}`;
  document.getElementById('breadcrumbParagraph').textContent = currentParagraph.name;
  
  // Update title
  document.getElementById('viewerTitle').textContent = lesson.title;
  
  // Render sidebar TOC
  renderSidebarNav(lesson.sections);
  
  // Render content sections
  renderContentSections(lesson.content, lesson.sections);
  
  // Render math
  if (window.renderMathInElement) {
    renderMathInElement(document.getElementById('viewLesson'), {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false }
      ],
      throwOnError: false
    });
  }
}

function renderSidebarNav(sections) {
  const container = document.getElementById('sidebarNavLinks');
  container.innerHTML = '';

  if (!sections || sections.length === 0) {
    container.innerHTML = '<p style="color: var(--ink-dim); font-size: 12px; padding: 0.5rem;">Geen secties</p>';
    return;
  }

  sections.forEach(section => {
    const btn = document.createElement('button');
    btn.className = 'tw-sidebar-block-btn';
    btn.style.cssText = 'width: 100%; text-align: left; padding: 0.25rem 1rem; margin-left: 1.5rem; border-radius: 0.25rem; font-size: 11px; font-family: inherit; color: var(--ink-dim); background: transparent; border: none; cursor: pointer; transition: background-color 0.15s ease, color 0.15s ease;';
    btn.textContent = section.title;
    btn.onclick = () => {
      const el = document.getElementById(`section-${section.id}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    container.appendChild(btn);
  });
}

function renderContentSections(mainContent, sections) {
  const container = document.getElementById('textbookSectionsContainer');
  container.innerHTML = '';

  // Render main content first
  if (mainContent) {
    const mainSection = document.createElement('div');
    mainSection.style.cssText = 'margin-bottom: 3rem; padding-bottom: 2rem; border-bottom: 1px solid var(--line);';
    
    // Simple markdown-like rendering
    let html = mainContent
      .replace(/### (.*)/g, '<h3 style="font-size: 26px; font-family: \'DM Serif Display\', serif; font-weight: normal; margin-bottom: 1rem; line-height: 1.2;">$1</h3>')
      .replace(/## (.*)/g, '<h2 style="font-size: 30px; font-family: \'DM Serif Display\', serif; font-weight: normal; margin-bottom: 1rem; line-height: 1.2;">$1</h2>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '</p><p style="font-size: 16px; line-height: 1.8; color: var(--ink); margin-bottom: 1rem;">')
      .replace(/\n/g, '<br>');
    
    mainSection.innerHTML = `<div style="font-size: 16px; line-height: 1.8; color: var(--ink);">${html}</div>`;
    container.appendChild(mainSection);
  }

  // Render sections
  if (sections && sections.length > 0) {
    sections.forEach(section => {
      const sectionEl = document.createElement('div');
      sectionEl.id = `section-${section.id}`;
      sectionEl.style.cssText = 'margin-bottom: 3rem; padding-bottom: 2rem; border-bottom: 1px solid var(--line);';

      sectionEl.innerHTML = `
        <h2 style="font-size: 26px; font-family: \'DM Serif Display\', serif; font-weight: normal; margin-bottom: 1rem; line-height: 1.2;">${section.title}</h2>
        <div style="font-size: 16px; line-height: 1.8; color: var(--ink);">${section.content}</div>
      `;

      container.appendChild(sectionEl);
    });
  }
}

function goBack() {
  window.location.href = `chapter.html?subject=${currentSubject.id}&chapter=${currentChapter.id}`;
}

// Scroll to top button
document.addEventListener('DOMContentLoaded', () => {
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.style.display = 'block';
    } else {
      scrollTopBtn.style.display = 'none';
    }
  });
  
  loadCurriculum();
});
