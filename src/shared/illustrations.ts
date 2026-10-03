export function illustrationUrl(key: string): string {
  if (key.startsWith('illustrations/parts/')) {
    const id = key.replace('illustrations/parts/', '');
    return `/assets/ill/parts/${id}.svg`;
  }
  if (key.startsWith('illustrations/diseases/')) {
    const id = key.replace('illustrations/diseases/', '');
    return `/assets/ill/diseases/${id}.svg`;
  }
  if (key.startsWith('ic_cause_')) {
    const id = key.replace('ic_cause_', '');
    return `/assets/ill/causes/${id}.svg`;
  }
  return '/assets/ill/placeholder.svg';
}

export function illImg(key: string, className = 'ill-thumb'): HTMLImageElement {
  const img = document.createElement('img');
  img.className = className;
  img.src = illustrationUrl(key);
  img.alt = '';
  img.loading = 'lazy';
  img.decoding = 'async';
  return img;
}
