import { el } from '../shared/dom';
import { setRubyText } from '../shared/furigana';
import { isFuriganaEnabled } from '../shared/settings';
import { loadDiseaseData } from '../shared/repository';
import { illImg } from '../shared/illustrations';
import { screenHeader } from '../shared/ui';

const MAP_REGIONS = [
  { id: 'head', label: 'あたま', left: 36, top: 12, w: 28, h: 10 },
  { id: 'throat', label: 'のど', left: 43, top: 24, w: 14, h: 8 },
  { id: 'lung', label: 'はい', left: 34, top: 31, w: 32, h: 14 },
  { id: 'heart', label: 'しんぞう', left: 44, top: 36, w: 12, h: 10 },
  { id: 'liver', label: 'かんぞう', left: 36, top: 42, w: 14, h: 10 },
  { id: 'stomach', label: 'い', left: 50, top: 43, w: 14, h: 10 },
  { id: 'intestine', label: 'ちょう', left: 38, top: 52, w: 24, h: 12 },
] as const;

const EXTRA_PARTS = ['eye', 'ear', 'nose', 'tooth', 'kidney', 'skin', 'bone', 'vessel', 'whole'];

export async function renderBodyMap(root: HTMLElement): Promise<void> {
  root.innerHTML = '<p class="loading">読み込み中…</p>';
  const data = await loadDiseaseData();
  const screen = el('div', 'screen');
  screen.appendChild(screenHeader('からだのぶい', '#/'));

  const hint = el('p', 'body-map-hint', 'あかいまるのぶいをタップしてね');
  const mapWrap = el('div', 'body-map-wrap');
  const img = document.createElement('img');
  img.className = 'body-map-img';
  img.src = '/assets/ill/body-map.svg';
  img.alt = 'からだのイラスト';
  mapWrap.appendChild(img);

  for (const r of MAP_REGIONS) {
    const hit = el('button', 'body-map-hit');
    hit.type = 'button';
    hit.style.left = `${r.left}%`;
    hit.style.top = `${r.top}%`;
    hit.style.width = `${r.w}%`;
    hit.style.height = `${r.h}%`;
    hit.setAttribute('aria-label', r.label);
    hit.addEventListener('click', () => {
      window.location.hash = `#/body/${r.id}`;
    });
    mapWrap.appendChild(hit);
  }

  const chipsTitle = el('h2', 'section-heading', 'ほかのぶい');
  const chips = el('div', 'chip-scroll');
  for (const id of EXTRA_PARTS) {
    const part = data.bodyParts.find((p) => p.id === id);
    if (!part) continue;
    const chip = el('button', 'chip-item');
    chip.type = 'button';
    chip.append(illImg(part.illustration, 'chip-icon'));
    const label = el('span', 'chip-label');
    setRubyText(label, part.nameRuby, isFuriganaEnabled());
    chip.append(label);
    chip.addEventListener('click', () => {
      window.location.hash = `#/body/${id}`;
    });
    chips.appendChild(chip);
  }

  screen.append(hint, mapWrap, chipsTitle, chips);
  root.replaceChildren(screen);
}
