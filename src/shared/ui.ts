import { el } from './dom';
import { isFuriganaEnabled, setFuriganaEnabled } from './settings';
import { setRubyText } from './furigana';
import { illImg } from './illustrations';

export function screenHeader(title: string, backHash: string): HTMLElement {
  const header = el('header', 'screen-header');
  const back = el('button', 'btn-ghost', '← もどる');
  back.type = 'button';
  back.addEventListener('click', () => {
    window.location.hash = backHash;
  });
  const h1 = el('h1', 'screen-title');
  setRubyText(h1, title, isFuriganaEnabled());
  header.append(back, h1);
  return header;
}

export function furiganaToggle(onChange?: () => void): HTMLElement {
  const row = el('label', 'furigana-toggle');
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = isFuriganaEnabled();
  const span = el('span', '', 'ふりがな');
  row.append(input, span);
  input.addEventListener('change', () => {
    setFuriganaEnabled(input.checked);
    onChange?.();
  });
  return row;
}

export function disclaimer(): HTMLElement {
  return el(
    'p',
    'disclaimer',
    'びょうきのことは、びょういんのせんせいやおうちのひとにもそうだんしてね',
  );
}

export function listRow(
  titleRuby: string,
  subtitleRuby: string | null,
  illustrationKey: string,
  onClick: () => void,
): HTMLElement {
  const row = el('button', 'list-row');
  row.type = 'button';
  row.append(illImg(illustrationKey, 'list-row-icon'));
  const text = el('div', 'list-row-text');
  const title = el('div', 'list-row-title');
  setRubyText(title, titleRuby, isFuriganaEnabled());
  text.append(title);
  if (subtitleRuby) {
    const sub = el('div', 'list-row-sub');
    setRubyText(sub, subtitleRuby, isFuriganaEnabled());
    text.append(sub);
  }
  row.append(text);
  row.addEventListener('click', onClick);
  return row;
}

export function detailSection(label: string, ruby: string): HTMLElement {
  const block = el('section', 'detail-section');
  block.appendChild(el('h2', 'detail-label', label));
  const body = el('div', 'detail-body');
  setRubyText(body, ruby, isFuriganaEnabled());
  block.append(body);
  return block;
}
