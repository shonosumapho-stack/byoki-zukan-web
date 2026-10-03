import { el } from '../shared/dom';
import { setRubyText } from '../shared/furigana';
import { isFuriganaEnabled } from '../shared/settings';
import { bodyPartById, diseasesForBodyPart, loadDiseaseData } from '../shared/repository';
import { illImg } from '../shared/illustrations';
import { detailSection, listRow, screenHeader } from '../shared/ui';

export async function renderBodyPartDetail(root: HTMLElement, partId: string): Promise<void> {
  root.innerHTML = '<p class="loading">読み込み中…</p>';
  const data = await loadDiseaseData();
  const part = bodyPartById(data, partId);
  if (!part) {
    root.innerHTML = '<p class="error">部位が見つかりません</p>';
    return;
  }

  const screen = el('div', 'screen detail-screen');
  screen.appendChild(screenHeader(part.nameRuby, '#/body'));

  const hero = illImg(part.illustration, 'detail-hero');
  const name = el('h2', 'detail-name');
  setRubyText(name, part.nameRuby, isFuriganaEnabled());

  screen.append(
    hero,
    name,
    detailSection('やくわり', part.roleRuby),
    detailSection('しくみ', part.howItWorksRuby),
    detailSection('まもるヒント', part.careTipRuby),
    detailSection('まめちしき', part.triviaRuby),
  );

  const related = diseasesForBodyPart(data, part.id);
  if (related.length) {
    screen.appendChild(el('h2', 'section-heading', 'このぶいのびょうき'));
    const list = el('div', 'list');
    for (const d of related) {
      list.appendChild(
        listRow(d.nameRuby, d.summaryRuby, d.illustration, () => {
          window.location.hash = `#/disease/${d.id}`;
        }),
      );
    }
    screen.append(list);
  }

  root.replaceChildren(screen);
}
