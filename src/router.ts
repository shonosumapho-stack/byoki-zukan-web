import { renderBodyMap } from './screens/bodyMapScreen';
import { renderBodyPartDetail } from './screens/bodyPartDetailScreen';
import { renderCauseList } from './screens/causeListScreen';
import { renderDiseaseDetail } from './screens/diseaseDetailScreen';
import { renderDiseaseList } from './screens/diseaseListScreen';
import { renderHome } from './screens/homeScreen';
import { renderQuiz } from './screens/quizScreen';
import { renderQuizResult } from './screens/quizResultScreen';

function routePath(hash: string): string {
  const base = hash.replace(/^#/, '').split('?')[0];
  return base || '/';
}

function parseQuery(hash: string): URLSearchParams {
  const q = hash.indexOf('?');
  if (q < 0) return new URLSearchParams();
  return new URLSearchParams(hash.slice(q + 1));
}

export function startRouter(root: HTMLElement): void {
  const render = () => {
    const path = routePath(window.location.hash);
    const parts = path.split('/').filter(Boolean);
    const query = parseQuery(window.location.hash);

    if (path === '/' || path === '') {
      renderHome(root);
      return;
    }
    if (path === '/body') {
      void renderBodyMap(root);
      return;
    }
    if (parts[0] === 'body' && parts[1]) {
      void renderBodyPartDetail(root, parts[1]);
      return;
    }
    if (path === '/causes') {
      void renderCauseList(root);
      return;
    }
    if (parts[0] === 'causes' && parts[1]) {
      void renderDiseaseList(root, { causeId: parts[1] });
      return;
    }
    if (path === '/diseases') {
      void renderDiseaseList(root, {});
      return;
    }
    if (parts[0] === 'disease' && parts[1]) {
      void renderDiseaseDetail(root, parts[1]);
      return;
    }
    if (path === '/quiz') {
      void renderQuiz(root);
      return;
    }
    if (parts[0] === 'quiz' && parts[1] === 'result') {
      const score = parseInt(query.get('score') ?? '0', 10);
      const total = parseInt(query.get('total') ?? '5', 10);
      renderQuizResult(root, score, total);
      return;
    }

    root.innerHTML = '<p class="error">ページが見つかりません</p><a href="#/">ホームへ</a>';
  };

  window.addEventListener('hashchange', render);
  if (!window.location.hash) {
    window.location.hash = '#/';
  }
  render();
}
