import { el } from '../shared/dom';
import { setRubyText } from '../shared/furigana';
import { isFuriganaEnabled } from '../shared/settings';
import { loadDiseaseData, makeQuiz } from '../shared/repository';
import type { QuizQuestion } from '../shared/types';
import { screenHeader } from '../shared/ui';

const QUIZ_KEY = 'byoki-quiz-session';

export function loadQuizSession(): QuizQuestion[] | null {
  const raw = sessionStorage.getItem(QUIZ_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as QuizQuestion[];
  } catch {
    return null;
  }
}

function saveQuizSession(questions: QuizQuestion[]): void {
  sessionStorage.setItem(QUIZ_KEY, JSON.stringify(questions));
}

export async function renderQuiz(root: HTMLElement): Promise<void> {
  root.innerHTML = '<p class="loading">読み込み中…</p>';
  const data = await loadDiseaseData();
  const questions = makeQuiz(data, 5);
  saveQuizSession(questions);

  const screen = el('div', 'screen quiz-screen');
  screen.appendChild(screenHeader('びょうめいクイズ', '#/'));

  let index = 0;
  let correctCount = 0;
  let answered = false;

  const progress = el('p', 'quiz-progress', '');
  const question = el('p', 'quiz-question', 'このびょうきのなまえは？');
  const hints = el('div', 'quiz-hints');
  const hintSite = el('div', 'quiz-hint');
  const hintCause = el('div', 'quiz-hint');
  const hintSymptom = el('div', 'quiz-hint');
  hints.append(hintSite, hintCause, hintSymptom);

  const feedback = el('p', 'quiz-feedback');
  feedback.hidden = true;
  const choices = el('div', 'quiz-choices');
  const after = el('div', 'quiz-after');
  after.hidden = true;
  const detailBtn = el('button', 'btn-secondary', 'くわしくみる');
  detailBtn.type = 'button';
  const nextBtn = el('button', 'btn-primary', 'つぎへ');
  nextBtn.type = 'button';
  after.append(detailBtn, nextBtn);

  screen.append(progress, question, hints, choices, feedback, after);
  root.replaceChildren(screen);

  const renderQuestion = () => {
    answered = false;
    const q = questions![index];
    progress.textContent = `もんだい ${index + 1} / ${questions!.length}`;
    const h = q.disease.quizHints;
    hintSite.replaceChildren();
    hintCause.replaceChildren();
    hintSymptom.replaceChildren();
    const siteLabel = el('span', 'quiz-hint-label', 'はっしょうぶい：');
    const siteBody = el('span', '');
    setRubyText(siteBody, h.siteRuby, isFuriganaEnabled());
    hintSite.append(siteLabel, siteBody);
    const causeLabel = el('span', 'quiz-hint-label', 'げんいん：');
    const causeBody = el('span', '');
    setRubyText(causeBody, h.causeRuby, isFuriganaEnabled());
    hintCause.append(causeLabel, causeBody);
    const symLabel = el('span', 'quiz-hint-label', 'しょうじょう：');
    const symBody = el('span', '');
    setRubyText(symBody, h.symptomRuby, isFuriganaEnabled());
    hintSymptom.append(symLabel, symBody);

    feedback.hidden = true;
    after.hidden = true;
    choices.replaceChildren();

    for (const choice of q.choices) {
      const btn = el('button', 'quiz-choice');
      btn.type = 'button';
      btn.dataset.diseaseId = choice.id;
      setRubyText(btn, choice.nameRuby, isFuriganaEnabled());
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        const ok = choice.id === q.disease.id;
        if (ok) correctCount++;
        for (const child of choices.querySelectorAll('.quiz-choice')) {
          const b = child as HTMLButtonElement;
          b.disabled = true;
          const id = b.dataset.diseaseId;
          if (id === q.disease.id) b.classList.add('quiz-choice--correct');
          else if (id === choice.id && !ok) b.classList.add('quiz-choice--wrong');
        }
        feedback.textContent = ok ? 'せいかい！' : 'ざんねん…';
        feedback.hidden = false;
        after.hidden = false;
        nextBtn.textContent = index >= questions!.length - 1 ? 'けっかをみる' : 'つぎへ';
        detailBtn.onclick = () => {
          window.location.hash = `#/disease/${q.disease.id}`;
        };
      });
      choices.appendChild(btn);
    }
  };

  nextBtn.addEventListener('click', () => {
    if (index >= questions!.length - 1) {
      sessionStorage.removeItem(QUIZ_KEY);
      window.location.hash = `#/quiz/result?score=${correctCount}&total=${questions!.length}`;
    } else {
      index++;
      renderQuestion();
    }
  });

  renderQuestion();
}
