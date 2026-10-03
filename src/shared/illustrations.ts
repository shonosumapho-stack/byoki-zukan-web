const PNG = '.png';

export function illustrationUrl(key: string): string {
  if (key.startsWith('illustrations/parts/')) {
    const id = key.replace('illustrations/parts/', '');
    return `/assets/illustrations/parts/${id}${PNG}`;
  }
  if (key.startsWith('illustrations/diseases/')) {
    const id = key.replace('illustrations/diseases/', '');
    return `/assets/illustrations/diseases/${id}${PNG}`;
  }
  if (key.startsWith('ic_cause_')) {
    const id = key.replace('ic_cause_', '');
    return `/assets/illustrations/causes/${id}${PNG}`;
  }
  return '/assets/illustrations/placeholder.png';
}

export function bodyMapUrl(): string {
  return '/assets/illustrations/body-map.png';
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
