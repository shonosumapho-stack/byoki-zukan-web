import { el } from '../shared/dom';
import { getBestQuizScore, setBestQuizScore } from '../shared/settings';
import { screenHeader } from '../shared/ui';

export function renderQuizResult(root: HTMLElement, score: number, total: number): void {
  setBestQuizScore(score);
  const best = getBestQuizScore();

  const screen = el('div', 'screen result-screen');
  screen.appendChild(screenHeader('けっか', '#/'));

  const card = el('div', 'result-card');
  card.appendChild(el('h2', 'result-title', 'おつかれさま！'));
  card.appendChild(el('p', 'result-score', `せいかい ${score} / ${total}`));
  if (best !== null) {
    card.appendChild(el('p', 'result-best', `これまでのベスト ${best} / ${total}`));
  }

  const again = el('button', 'btn-primary', 'もういちど');
  again.type = 'button';
  again.addEventListener('click', () => {
    sessionStorage.removeItem('byoki-quiz-session');
    window.location.hash = '#/quiz';
  });
  const home = el('a', 'btn-secondary', 'ホームへ');
  home.href = '#/';

  screen.append(card, again, home);
  root.replaceChildren(screen);
}
