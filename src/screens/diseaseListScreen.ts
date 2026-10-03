import { el } from '../shared/dom';
import { setRubyText } from '../shared/furigana';
import { isFuriganaEnabled } from '../shared/settings';
import { causeById, diseasesForCause, loadDiseaseData } from '../shared/repository';
import { listRow, screenHeader } from '../shared/ui';

export async function renderDiseaseList(
  root: HTMLElement,
  opts: { causeId?: string; title?: string },
): Promise<void> {
  root.innerHTML = '<p class="loading">読み込み中…</p>';
  const data = await loadDiseaseData();
  const back = opts.causeId ? '#/causes' : '#/';
  let title = opts.title ?? 'びょうきいちらん';
  if (opts.causeId && !opts.title) {
    const cause = causeById(data, opts.causeId);
    if (cause) title = cause.nameRuby;
  }

  const diseases = opts.causeId
    ? diseasesForCause(data, opts.causeId)
    : [...data.diseases].sort((a, b) => a.name.localeCompare(b.name, 'ja'));

  const screen = el('div', 'screen');
  const header = screenHeader(title, back);
  const titleEl = header.querySelector('.screen-title');
  if (titleEl) setRubyText(titleEl as HTMLElement, title, isFuriganaEnabled());
  screen.appendChild(header);

  const list = el('div', 'list');
  for (const d of diseases) {
    list.appendChild(
      listRow(d.nameRuby, d.summaryRuby, d.illustration, () => {
        window.location.hash = `#/disease/${d.id}`;
      }),
    );
  }
  screen.append(list);
  root.replaceChildren(screen);
}
