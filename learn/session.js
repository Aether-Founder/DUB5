/* DUB5 Learn - Interactive Study Sessions JavaScript */

/* --------------------------------------------------------------------------
   1. CURRICULUM LOADING
   -------------------------------------------------------------------------- */
let curriculum = null;
let currentSubject = null;
let currentChapter = null;
let currentParagraph = null;
let LEARNING_SET = null;

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
          if (currentParagraph && currentParagraph.learningSet) {
            LEARNING_SET = currentParagraph.learningSet;
            initializeApp();
          } else {
            document.querySelector('.container').innerHTML = '<p style="color: var(--ink-dim); padding: 2rem;">Geen oefeningen beschikbaar voor deze paragraaf.</p>';
          }
        } else {
          document.querySelector('.container').innerHTML = '<p style="color: var(--ink-dim); padding: 2rem;">Hoofdstuk niet gevonden.</p>';
        }
      } else {
        document.querySelector('.container').innerHTML = '<p style="color: var(--ink-dim); padding: 2rem;">Vak niet gevonden.</p>';
      }
    } else {
      window.location.href = '/learn';
    }
  } catch (error) {
    console.error('Error loading curriculum:', error);
    document.querySelector('.container').innerHTML = '<p style="color: var(--ink-dim); padding: 2rem;">Er is een fout opgetreden bij het laden.</p>';
  }
}

function goBack() {
  window.location.href = `chapter.html?subject=${currentSubject.id}&chapter=${currentChapter.id}`;
}

/* --------------------------------------------------------------------------
   2. NAVIGATION & ROUTING STATE
   -------------------------------------------------------------------------- */
let currentModeName = 'home';

function navigateTo(viewId) {
  document.querySelectorAll('.app-view').forEach(el => el.style.display = 'none');
  const target = document.getElementById(`view-${viewId}`);
  if (target) target.style.display = 'block';

  const navBackBtn = document.getElementById('navBackBtn');
  if (viewId === 'home') {
    navBackBtn.style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    navBackBtn.style.display = 'inline-flex';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  currentModeName = viewId;
}

function startMode(mode) {
  if (mode === 'flashcards') initFlashcards();
  else if (mode === 'mcq') initMcq();
  else if (mode === 'write') initWrite();
  else if (mode === 'test') initTest();
  else if (mode === 'truefalse') initTrueFalse();
  else if (mode === 'match') initMatch();
}

function retryCurrentMode() {
  if (lastSessionMode) startMode(lastSessionMode);
  else navigateTo('home');
}

let lastSessionMode = null;

/* --------------------------------------------------------------------------
   3. MODE 1: FLASHCARDS LOGIC
   -------------------------------------------------------------------------- */
let fcIndex = 0;
let fcList = [];

function initFlashcards() {
  fcList = [...LEARNING_SET.terms];
  fcIndex = 0;
  updateFlashcardUI();
  navigateTo('flashcards');
}

function updateFlashcardUI() {
  const card = fcList[fcIndex];
  const cardEl = document.getElementById('flashcardElement');
  cardEl.classList.remove('is-flipped');

  document.getElementById('fcFrontTerm').textContent = card.term;
  document.getElementById('fcBackDefinition').textContent = card.definition;
  
  const total = fcList.length;
  document.getElementById('fcProgressCounter').textContent = `${fcIndex + 1} / ${total}`;
  document.getElementById('fcProgressBar').style.width = `${((fcIndex + 1) / total) * 100}%`;
}

function flipCurrentCard() {
  document.getElementById('flashcardElement').classList.toggle('is-flipped');
}

function nextCard() {
  fcIndex = (fcIndex + 1) % fcList.length;
  updateFlashcardUI();
}

function prevCard() {
  fcIndex = (fcIndex - 1 + fcList.length) % fcList.length;
  updateFlashcardUI();
}

function shuffleCards() {
  fcList = [...fcList].sort(() => Math.random() - 0.5);
  fcIndex = 0;
  updateFlashcardUI();
}

// Keyboard support for flashcards
window.addEventListener('keydown', (e) => {
  if (currentModeName === 'flashcards') {
    if (e.code === 'Space') {
      e.preventDefault();
      flipCurrentCard();
    } else if (e.code === 'ArrowRight') {
      e.preventDefault();
      nextCard();
    } else if (e.code === 'ArrowLeft') {
      e.preventDefault();
      prevCard();
    }
  }
});

/* --------------------------------------------------------------------------
   4. MODE 2: MULTIPLE CHOICE LOGIC
   -------------------------------------------------------------------------- */
let mcqIndex = 0;
let mcqScore = 0;
let mcqQuestions = [];
let mcqAnswered = false;

function initMcq() {
  mcqQuestions = [...LEARNING_SET.terms].sort(() => Math.random() - 0.5);
  mcqIndex = 0;
  mcqScore = 0;
  lastSessionMode = 'mcq';
  renderMcqQuestion();
  navigateTo('mcq');
}

function renderMcqQuestion() {
  mcqAnswered = false;
  const current = mcqQuestions[mcqIndex];
  const total = mcqQuestions.length;

  document.getElementById('mcqQuestionTerm').textContent = current.term;
  document.getElementById('mcqProgressCounter').textContent = `Question ${mcqIndex + 1} of ${total}`;
  document.getElementById('mcqProgressBar').style.width = `${((mcqIndex + 1) / total) * 100}%`;

  document.getElementById('mcqFeedbackBanner').style.display = 'none';
  document.getElementById('mcqNextBtn').style.display = 'none';

  // Pick 3 distractor definitions
  const distractors = LEARNING_SET.terms
    .filter(t => t.id !== current.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map(t => t.definition);

  const options = [current.definition, ...distractors].sort(() => Math.random() - 0.5);

  const container = document.getElementById('mcqOptionsContainer');
  container.innerHTML = '';

  const letters = ['A', 'B', 'C', 'D'];
  options.forEach((optText, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `
      <span class="option-indicator">${letters[i]}</span>
      <span style="flex: 1;">${optText}</span>
    `;
    btn.onclick = () => handleMcqSelect(optText, current.definition, btn);
    container.appendChild(btn);
  });
}

function handleMcqSelect(selectedDef, correctDef, btnElement) {
  if (mcqAnswered) return;
  mcqAnswered = true;

  const isCorrect = (selectedDef === correctDef);
  if (isCorrect) mcqScore++;

  // Highlight options
  const allBtns = document.querySelectorAll('#mcqOptionsContainer .option-btn');
  allBtns.forEach(btn => {
    btn.disabled = true;
    const text = btn.querySelector('span:nth-child(2)').textContent.trim();
    if (text === correctDef) {
      btn.classList.add('correct');
    } else if (btn === btnElement && !isCorrect) {
      btn.classList.add('incorrect');
    }
  });

  // Feedback banner
  const banner = document.getElementById('mcqFeedbackBanner');
  const feedTitle = document.getElementById('mcqFeedbackText');
  const feedSub = document.getElementById('mcqFeedbackSub');

  banner.style.display = 'block';
  if (isCorrect) {
    banner.style.backgroundColor = 'var(--success-bg)';
    banner.style.borderColor = 'var(--success-border)';
    feedTitle.style.color = 'var(--success-text)';
    feedTitle.textContent = 'Correct! Outstanding.';
    feedSub.textContent = `Matched correctly with "${selectedDef}".`;
  } else {
    banner.style.backgroundColor = 'var(--error-bg)';
    banner.style.borderColor = 'var(--error-border)';
    feedTitle.style.color = 'var(--error-text)';
    feedTitle.textContent = 'Incorrect';
    feedSub.textContent = `The correct definition is: "${correctDef}".`;
  }

  document.getElementById('mcqNextBtn').style.display = 'inline-flex';
}

function nextMcqQuestion() {
  mcqIndex++;
  if (mcqIndex < mcqQuestions.length) {
    renderMcqQuestion();
  } else {
    showResultsScreen('Multiple Choice Complete', mcqScore, mcqQuestions.length);
  }
}

/* --------------------------------------------------------------------------
   5. MODE 3: WRITE MODE LOGIC
   -------------------------------------------------------------------------- */
let writeIndex = 0;
let writeScore = 0;
let writeList = [];

function initWrite() {
  writeList = [...LEARNING_SET.terms].sort(() => Math.random() - 0.5);
  writeIndex = 0;
  writeScore = 0;
  lastSessionMode = 'write';
  renderWriteQuestion();
  navigateTo('write');
}

function renderWriteQuestion() {
  const current = writeList[writeIndex];
  const total = writeList.length;

  document.getElementById('writePromptDefinition').textContent = current.definition;
  document.getElementById('writeProgressCounter').textContent = `${writeIndex + 1} / ${total}`;
  document.getElementById('writeProgressBar').style.width = `${((writeIndex + 1) / total) * 100}%`;

  const input = document.getElementById('writeInput');
  input.value = '';
  input.disabled = false;
  input.focus();

  document.getElementById('writeSubmitBtn').disabled = false;
  document.getElementById('writeFeedbackBanner').style.display = 'none';
}

function normalizeText(str) {
  return (str || '').trim().toLowerCase().replace(/[^a-z0-9]/g, '');
}

function handleWriteSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('writeInput');
  const userVal = input.value;
  if (!userVal.trim()) return;

  const current = writeList[writeIndex];
  const isCorrect = normalizeText(userVal) === normalizeText(current.term);

  if (isCorrect) writeScore++;
  showWriteFeedback(isCorrect, userVal, current.term);
}

function giveUpWrite() {
  const current = writeList[writeIndex];
  showWriteFeedback(false, "(Skipped)", current.term);
}

function showWriteFeedback(isCorrect, userVal, correctTerm) {
  document.getElementById('writeInput').disabled = true;
  document.getElementById('writeSubmitBtn').disabled = true;

  const banner = document.getElementById('writeFeedbackBanner');
  const title = document.getElementById('writeFeedbackTitle');
  const details = document.getElementById('writeFeedbackDetails');

  banner.style.display = 'block';
  if (isCorrect) {
    banner.style.backgroundColor = 'var(--success-bg)';
    banner.style.borderColor = 'var(--success-border)';
    title.style.color = 'var(--success-text)';
    title.textContent = 'Correct!';
    details.innerHTML = `You typed: <strong>${userVal}</strong>`;
  } else {
    banner.style.backgroundColor = 'var(--error-bg)';
    banner.style.borderColor = 'var(--error-border)';
    title.style.color = 'var(--error-text)';
    title.textContent = 'Incorrect';
    details.innerHTML = `Your answer: <span style="text-decoration: line-through;">${userVal || 'Blank'}</span><br>Correct answer: <strong>${correctTerm}</strong>`;
  }
}

function nextWriteQuestion() {
  writeIndex++;
  if (writeIndex < writeList.length) {
    renderWriteQuestion();
  } else {
    showResultsScreen('Write Practice Complete', writeScore, writeList.length);
  }
}

/* --------------------------------------------------------------------------
   6. MODE 4: TEST MODE (NO INSTANT FEEDBACK, COMPREHENSIVE FINAL BREAKDOWN)
   -------------------------------------------------------------------------- */
let testIndex = 0;
let testQuestions = [];
let testUserAnswers = [];

function initTest() {
  // 8 questions generated from dataset (50% MCQ, 50% Written)
  const shuffled = [...LEARNING_SET.terms].sort(() => Math.random() - 0.5).slice(0, 8);
  testQuestions = shuffled.map((item, idx) => {
    const isMcq = idx % 2 === 0;
    let options = [];
    if (isMcq) {
      const distractors = LEARNING_SET.terms
        .filter(t => t.id !== item.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(t => t.definition);
      options = [item.definition, ...distractors].sort(() => Math.random() - 0.5);
    }
    return {
      item,
      type: isMcq ? 'mcq' : 'written',
      options
    };
  });

  testIndex = 0;
  testUserAnswers = [];
  lastSessionMode = 'test';
  renderTestQuestion();
  navigateTo('test');
}

function renderTestQuestion() {
  const q = testQuestions[testIndex];
  const total = testQuestions.length;

  document.getElementById('testProgressCounter').textContent = `Question ${testIndex + 1} of ${total}`;
  document.getElementById('testProgressBar').style.width = `${((testIndex + 1) / total) * 100}%`;

  const typeLabel = document.getElementById('testQuestionTypeLabel');
  const prompt = document.getElementById('testQuestionPrompt');
  const container = document.getElementById('testInteractionContainer');
  const nextBtn = document.getElementById('testNextBtn');

  container.innerHTML = '';
  nextBtn.disabled = true;
  nextBtn.textContent = (testIndex === total - 1) ? 'Finish Test &rarr;' : 'Next Question &rarr;';

  if (q.type === 'mcq') {
    typeLabel.textContent = 'Multiple Choice Question';
    prompt.textContent = `What is the definition of "${q.item.term}"?`;

    const optionsBox = document.createElement('div');
    optionsBox.className = 'options-grid';

    const letters = ['A', 'B', 'C', 'D'];
    q.options.forEach((optText, i) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.innerHTML = `
        <span class="option-indicator">${letters[i]}</span>
        <span style="flex: 1;">${optText}</span>
      `;
      btn.onclick = () => {
        optionsBox.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        testUserAnswers[testIndex] = optText;
        nextBtn.disabled = false;
      };
      optionsBox.appendChild(btn);
    });
    container.appendChild(optionsBox);

  } else {
    typeLabel.textContent = 'Written Answer Question';
    prompt.textContent = `Which cellular term matches: "${q.item.definition}"?`;

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'text-input';
    input.placeholder = 'Type term name here...';
    input.oninput = () => {
      testUserAnswers[testIndex] = input.value.trim();
      nextBtn.disabled = !input.value.trim();
    };
    input.onkeydown = (e) => {
      if (e.key === 'Enter' && input.value.trim()) {
        e.preventDefault();
        handleTestNext();
      }
    };
    container.appendChild(input);
    setTimeout(() => input.focus(), 50);
  }
}

function handleTestNext() {
  testIndex++;
  if (testIndex < testQuestions.length) {
    renderTestQuestion();
  } else {
    finishTestAndShowResults();
  }
}

function finishTestAndShowResults() {
  let correctCount = 0;
  const breakdown = [];

  testQuestions.forEach((q, i) => {
    const userAns = testUserAnswers[i] || '';
    let isCorrect = false;
    let expected = '';

    if (q.type === 'mcq') {
      expected = q.item.definition;
      isCorrect = (userAns === expected);
    } else {
      expected = q.item.term;
      isCorrect = normalizeText(userAns) === normalizeText(expected);
    }

    if (isCorrect) correctCount++;
    breakdown.push({
      qNum: i + 1,
      term: q.item.term,
      prompt: q.type === 'mcq' ? `Definition of ${q.item.term}` : q.item.definition,
      userAns,
      expected,
      isCorrect
    });
  });

  showResultsScreen('Official Test Results', correctCount, testQuestions.length, breakdown);
}

/* --------------------------------------------------------------------------
   7. MODE 5: TRUE OR FALSE LOGIC
   -------------------------------------------------------------------------- */
let tfIndex = 0;
let tfScore = 0;
let tfQuestions = [];
let tfAnswered = false;

function initTrueFalse() {
  tfQuestions = [...LEARNING_SET.terms].sort(() => Math.random() - 0.5).map((item, idx) => {
    const isTrue = idx % 2 === 0; // Alternating true / false pairings
    let displayedDefinition = item.definition;
    if (!isTrue) {
      const falseMatch = LEARNING_SET.terms.find(t => t.id !== item.id);
      displayedDefinition = falseMatch ? falseMatch.definition : "Unrelated definition";
    }
    return {
      item,
      isTrue,
      displayedDefinition
    };
  });

  tfIndex = 0;
  tfScore = 0;
  lastSessionMode = 'truefalse';
  renderTrueFalseQuestion();
  navigateTo('truefalse');
}

function renderTrueFalseQuestion() {
  tfAnswered = false;
  const current = tfQuestions[tfIndex];
  const total = tfQuestions.length;

  document.getElementById('tfProgressCounter').textContent = `Statement ${tfIndex + 1} of ${total}`;
  document.getElementById('tfProgressBar').style.width = `${((tfIndex + 1) / total) * 100}%`;

  document.getElementById('tfTermTitle').textContent = current.item.term;
  document.getElementById('tfDefinitionText').textContent = current.displayedDefinition;

  document.getElementById('tfFeedbackBanner').style.display = 'none';
  document.getElementById('tfActionButtons').style.display = 'grid';
}

function handleTrueFalseChoice(userChoice) {
  if (tfAnswered) return;
  tfAnswered = true;

  const current = tfQuestions[tfIndex];
  const isCorrect = (userChoice === current.isTrue);
  if (isCorrect) tfScore++;

  document.getElementById('tfActionButtons').style.display = 'none';
  const banner = document.getElementById('tfFeedbackBanner');
  const title = document.getElementById('tfFeedbackTitle');
  const details = document.getElementById('tfFeedbackDetails');

  banner.style.display = 'block';
  if (isCorrect) {
    banner.style.backgroundColor = 'var(--success-bg)';
    banner.style.borderColor = 'var(--success-border)';
    title.style.color = 'var(--success-text)';
    title.textContent = 'Correct!';
    details.textContent = current.isTrue 
      ? `True: That is the exact correct definition for ${current.item.term}.`
      : `False: That definition belongs to another organelle. Real definition: "${current.item.definition}".`;
  } else {
    banner.style.backgroundColor = 'var(--error-bg)';
    banner.style.borderColor = 'var(--error-border)';
    title.style.color = 'var(--error-text)';
    title.textContent = 'Incorrect';
    details.textContent = current.isTrue
      ? `Statement was actually True for ${current.item.term}.`
      : `Statement was False. Correct definition for ${current.item.term}: "${current.item.definition}".`;
  }
}

function nextTrueFalseQuestion() {
  tfIndex++;
  if (tfIndex < tfQuestions.length) {
    renderTrueFalseQuestion();
  } else {
    showResultsScreen('True / False Review Complete', tfScore, tfQuestions.length);
  }
}

/* --------------------------------------------------------------------------
   8. MODE 6: MATCH GAME LOGIC
   -------------------------------------------------------------------------- */
let matchCards = [];
let selectedFirstCard = null;
let matchesRemaining = 0;
let matchTimerInterval = null;
let matchStartTime = null;

function initMatch() {
  lastSessionMode = 'match';
  if (matchTimerInterval) clearInterval(matchTimerInterval);

  // Select 6 terms for a quick, focused round
  const selectedTerms = [...LEARNING_SET.terms].sort(() => Math.random() - 0.5).slice(0, 6);
  matchesRemaining = selectedTerms.length;

  const cards = [];
  selectedTerms.forEach(t => {
    cards.push({ id: `term-${t.id}`, pairId: t.id, text: t.term, type: 'term' });
    cards.push({ id: `def-${t.id}`, pairId: t.id, text: t.definition, type: 'def' });
  });

  matchCards = cards.sort(() => Math.random() - 0.5);
  selectedFirstCard = null;

  document.getElementById('matchCompleteCard').style.display = 'none';
  document.getElementById('matchGridContainer').style.display = 'grid';
  document.getElementById('matchPairStats').textContent = `${matchesRemaining} Pairs Remaining`;

  renderMatchGrid();
  navigateTo('match');

  // Start timer
  matchStartTime = Date.now();
  matchTimerInterval = setInterval(() => {
    const elapsed = ((Date.now() - matchStartTime) / 1000).toFixed(1);
    document.getElementById('matchTimer').textContent = `${elapsed}s`;
  }, 100);
}

function renderMatchGrid() {
  const container = document.getElementById('matchGridContainer');
  container.innerHTML = '';

  matchCards.forEach(card => {
    const el = document.createElement('div');
    el.className = 'match-card';
    el.id = `card-${card.id}`;
    el.textContent = card.text;
    el.onclick = () => handleMatchCardClick(card, el);
    container.appendChild(el);
  });
}

function handleMatchCardClick(card, element) {
  if (element.classList.contains('matched') || element.classList.contains('selected')) return;

  if (!selectedFirstCard) {
    selectedFirstCard = { card, element };
    element.classList.add('selected');
  } else {
    const first = selectedFirstCard;
    // Don't allow clicking the same card twice
    if (first.card.id === card.id) return;

    element.classList.add('selected');

    // Check match
    if (first.card.pairId === card.pairId && first.card.type !== card.type) {
      // Success match
      setTimeout(() => {
        first.element.classList.remove('selected');
        element.classList.remove('selected');
        first.element.classList.add('matched');
        element.classList.add('matched');
        selectedFirstCard = null;
        matchesRemaining--;
        document.getElementById('matchPairStats').textContent = `${matchesRemaining} Pairs Remaining`;

        if (matchesRemaining === 0) {
          clearInterval(matchTimerInterval);
          const totalElapsed = ((Date.now() - matchStartTime) / 1000).toFixed(1);
          document.getElementById('matchGridContainer').style.display = 'none';
          document.getElementById('matchCompleteCard').style.display = 'block';
          document.getElementById('matchFinalTimeMsg').textContent = `You cleared all 6 pairs in ${totalElapsed} seconds!`;
        }
      }, 200);
    } else {
      // Failure match
      setTimeout(() => {
        first.element.classList.add('error-shake');
        element.classList.add('error-shake');
        setTimeout(() => {
          first.element.classList.remove('selected', 'error-shake');
          element.classList.remove('selected', 'error-shake');
          selectedFirstCard = null;
        }, 400);
      }, 200);
    }
  }
}

/* --------------------------------------------------------------------------
   9. RESULTS PRESENTATION
   -------------------------------------------------------------------------- */
function showResultsScreen(title, score, total, breakdownList = null) {
  document.getElementById('resultsTitle').textContent = title;
  const pct = Math.round((score / total) * 100);
  document.getElementById('resAccuracy').textContent = `${pct}%`;
  document.getElementById('resCorrect').textContent = score;
  document.getElementById('resIncorrect').textContent = (total - score);

  const breakdownBox = document.getElementById('testBreakdownContainer');
  const listEl = document.getElementById('testBreakdownList');

  if (breakdownList && breakdownList.length > 0) {
    breakdownBox.style.display = 'block';
    listEl.innerHTML = '';

    breakdownList.forEach(item => {
      const row = document.createElement('div');
      row.className = 'card';
      row.style.padding = '0.85rem 1rem';
      row.style.backgroundColor = item.isCorrect ? 'var(--success-bg)' : 'var(--error-bg)';
      row.style.borderColor = item.isCorrect ? 'var(--success-border)' : 'var(--error-border)';

      row.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.25rem;">
          <strong style="color: ${item.isCorrect ? 'var(--success-text)' : 'var(--error-text)'};">
            ${item.isCorrect ? '✓ Correct' : '✗ Incorrect'} &bull; Question ${item.qNum} (${item.term})
          </strong>
        </div>
        <div style="font-size: 13px; color: #fff; margin-bottom: 0.25rem;">${item.prompt}</div>
        <div style="font-size: 12.5px; color: var(--ink-dim);">
          Your Answer: <strong>${item.userAns || 'Blank'}</strong> &bull; Correct: <strong>${item.expected}</strong>
        </div>
      `;
      listEl.appendChild(row);
    });
  } else {
    breakdownBox.style.display = 'none';
  }

  navigateTo('results');
}

/* --------------------------------------------------------------------------
   10. INITIALIZATION ON PAGE LOAD
   -------------------------------------------------------------------------- */
function initializeApp() {
  // Update breadcrumb
  document.getElementById('breadcrumbSubject').textContent = currentSubject.name;
  document.getElementById('breadcrumbSubject').href = `subject.html?id=${currentSubject.id}`;
  document.getElementById('breadcrumbChapter').textContent = currentChapter.name;
  document.getElementById('breadcrumbChapter').href = `chapter.html?subject=${currentSubject.id}&chapter=${currentChapter.id}`;
  document.getElementById('breadcrumbParagraph').textContent = currentParagraph.name;
  
  // Update header
  document.querySelector('#view-home h1').textContent = LEARNING_SET.title;
  document.querySelector('#view-home p').textContent = LEARNING_SET.description;
  
  // Populate Set Terms Table
  const tableBody = document.getElementById('termsTableBody');
  tableBody.innerHTML = '';
  LEARNING_SET.terms.forEach(t => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="font-weight: 600; font-family: 'DM Serif Display', serif; font-size: 16px;">${t.term}</td>
      <td style="color: var(--ink-dim); line-height: 1.5;">${t.definition}</td>
    `;
    tableBody.appendChild(tr);
  });

  document.getElementById('termCountBadge').textContent = `${LEARNING_SET.terms.length} termen`;
  document.getElementById('termTableCount').textContent = `${LEARNING_SET.terms.length} termen`;

  // Start at Home Screen
  navigateTo('home');
}

document.addEventListener('DOMContentLoaded', loadCurriculum);
