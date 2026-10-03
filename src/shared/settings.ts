const KEY = 'byoki-furigana';

export function isFuriganaEnabled(): boolean {
  const v = localStorage.getItem(KEY);
  if (v === null) return true;
  return v === '1';
}

export function setFuriganaEnabled(enabled: boolean): void {
  localStorage.setItem(KEY, enabled ? '1' : '0');
}

const BEST_KEY = 'byoki-quiz-best';

export function getBestQuizScore(): number | null {
  const v = localStorage.getItem(BEST_KEY);
  if (!v) return null;
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : null;
}

export function setBestQuizScore(score: number): void {
  const prev = getBestQuizScore();
  if (prev === null || score > prev) {
    localStorage.setItem(BEST_KEY, String(score));
  }
}
