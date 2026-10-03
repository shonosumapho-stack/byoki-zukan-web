import { el } from '../shared/dom';
import { setRubyText } from '../shared/furigana';
import { isFuriganaEnabled } from '../shared/settings';
import { bodyPartsFor, causesFor, diseaseById, loadDiseaseData } from '../shared/repository';
import { illImg } from '../shared/illustrations';
import { detailSection, screenHeader } from '../shared/ui';

export async function renderDiseaseDetail(root: HTMLElement, diseaseId: string): Promise<void> {
  root.innerHTML = '<p class="loading">読み込み中…</p>';
  const data = await loadDiseaseData();
  const disease = diseaseById(data, diseaseId);
  if (!disease) {
    root.innerHTML = '<p class="error">病気が見つかりません</p>';
    return;
  }

  const screen = el('div', 'screen detail-screen');
  screen.appendChild(screenHeader(disease.nameRuby, '#/diseases'));

  const hero = illImg(disease.illustration, 'detail-hero');
  const name = el('h2', 'detail-name');
  setRubyText(name, disease.nameRuby, isFuriganaEnabled());
  const summary = el('p', 'detail-summary');
  setRubyText(summary, disease.summaryRuby, isFuriganaEnabled());

  const sites = bodyPartsFor(data, disease).map((p) => p.nameRuby).join('・');
  const causeNames = causesFor(data, disease).map((c) => c.nameRuby).join('・');
  let causeRuby = causeNames;
  if (disease.agentRuby) {
    causeRuby = causeRuby ? `${causeRuby}\n${disease.agentRuby}` : disease.agentRuby;
  }

  screen.append(
    hero,
    name,
    summary,
    detailSection('どこがわるい？', sites),
    detailSection('なにがげんいん？', causeRuby),
    detailSection('しょうじょう', disease.symptomsRuby),
    detailSection('くわしく', disease.detailRuby),
    detailSection('たいせつなこと', disease.careRuby),
    detailSection('まめちしき', disease.triviaRuby),
  );

  root.replaceChildren(screen);
}
