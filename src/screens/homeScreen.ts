import { el } from '../shared/dom';
import { setRubyText } from '../shared/furigana';
import { isFuriganaEnabled } from '../shared/settings';
import { disclaimer, furiganaToggle } from '../shared/ui';

export function renderHome(root: HTMLElement): void {
  const screen = el('div', 'screen home-screen');
  const title = el('h1', 'home-title');
  setRubyText(title, '病気{びょうき}図鑑{ずかん}', isFuriganaEnabled());
  const sub = el('p', 'home-sub', 'からだのしくみとびょうきをしろう');

  const actions = el('div', 'home-actions');
  const body = el('a', 'home-btn home-btn--body', 'ぶいからみる');
  body.href = '#/body';
  const cause = el('a', 'home-btn home-btn--cause', 'げんいんからみる');
  cause.href = '#/causes';
  const all = el('a', 'home-btn home-btn--all', 'すべてのびょうき');
  all.href = '#/diseases';
  const quiz = el('a', 'home-btn home-btn--quiz', 'びょうめいクイズ');
  quiz.href = '#/quiz';

  actions.append(body, cause, all, quiz);
  screen.append(title, sub, furiganaToggle(() => renderHome(root)), actions, disclaimer());
  root.replaceChildren(screen);
}
