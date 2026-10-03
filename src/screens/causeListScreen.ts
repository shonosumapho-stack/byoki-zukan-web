import { el } from '../shared/dom';
import { loadDiseaseData } from '../shared/repository';
import { listRow, screenHeader } from '../shared/ui';

export async function renderCauseList(root: HTMLElement): Promise<void> {
  root.innerHTML = '<p class="loading">読み込み中…</p>';
  const data = await loadDiseaseData();
  const screen = el('div', 'screen');
  screen.appendChild(screenHeader('びょうきのげんいん', '#/'));

  const list = el('div', 'list');
  for (const cause of data.causes) {
    list.appendChild(
      listRow(cause.nameRuby, cause.summaryRuby, cause.icon, () => {
        window.location.hash = `#/causes/${cause.id}`;
      }),
    );
  }
  screen.append(list);
  root.replaceChildren(screen);
}
