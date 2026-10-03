import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'assets', 'ill');

function svg(paths, fill, bg = '#FFF8F0') {
  const body = paths.map((p) => `<path fill="${fill}" d="${p}"/>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 108 108" role="img" aria-hidden="true"><rect width="108" height="108" fill="${bg}"/>${body}</svg>`;
}

async function write(rel, content) {
  const file = path.join(root, rel);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, content, 'utf8');
}

const parts = {
  head: ['#FBBF24', ['M54,20c-16,0 -28,12 -28,28 0,20 12,36 28,44 16,-8 28,-24 28,-44 0,-16 -12,-28 -28,-28z', 'M42,44h8v8h-8zM58,44h8v8h-8z', 'M42,62c4,6 12,8 20,0']],
  throat: ['#FB7185', ['M40,20h28v12h-28z', 'M46,32h16v48c0,8 -4,12 -8,12s-8,-4 -8,-12z']],
  nose: ['#FDBA74', ['M54,24c-8,16 -14,32 -14,44 0,10 6,16 14,16s14,-6 14,-16c0,-12 -6,-28 -14,-44z']],
  lung: ['#38BDF8', ['M30,28c-8,0 -14,10 -14,24 0,22 10,40 24,40 4,0 6,-4 6,-10V36c0,-6 -6,-8 -16,-8z', 'M78,28c8,0 14,10 14,24 0,22 -10,40 -24,40 -4,0 -6,-4 -6,-10V36c0,-6 6,-8 16,-8z', 'M50,24h8v56h-8z']],
  heart: ['#F43F5E', ['M54,86L24,50c-8,-10 -6,-26 8,-32 10,-4 18,0 22,8 4,-8 12,-12 22,-8 14,6 16,22 8,32z']],
  stomach: ['#F59E0B', ['M34,30c0,-8 8,-14 20,-14s20,6 20,14c8,6 12,18 8,32 -4,16 -16,28 -28,28s-24,-12 -28,-28c-4,-14 0,-26 8,-32z']],
  intestine: ['#F97316', ['M28,40c0,-8 8,-12 16,-8 6,2 8,8 8,14 0,8 6,12 14,10 8,-2 12,-10 10,-18 -2,-8 4,-14 12,-12 10,2 14,12 12,22 -4,20 -22,36 -40,36 -20,0 -34,-18 -32,-36z']],
  liver: ['#A16207', ['M22,40c0,-12 14,-22 32,-22 20,0 34,8 36,22 2,16 -8,36 -28,42 -18,6 -36,-8 -40,-24z']],
  kidney: ['#E11D48', ['M28,30c-10,8 -12,28 -4,42 8,12 22,14 30,4 4,-6 4,-14 0,-20 -6,-10 -6,-18 0,-26 4,-6 4,-14 0,-20 -8,-10 -22,-8 -30,4 -2,4 -2,10 4,16z', 'M80,30c10,8 12,28 4,42 -8,12 -22,14 -30,4 -4,-6 -4,-14 0,-20 6,-10 6,-18 0,-26 -4,-6 -4,-14 0,-20 8,-10 22,-8 30,4 2,4 2,10 -4,16z']],
  skin: ['#FCD34D', ['M30,24h48v60h-48z', 'M38,36h32v8h-32z', 'M38,52h24v8h-24z']],
  bone: ['#94A3B8', ['M24,48c0,-10 8,-16 18,-16h8v32h-8c-10,0 -18,-6 -18,-16z', 'M58,32h8c10,0 18,6 18,16s-8,16 -18,16h-8z', 'M42,40h24v16h-24z']],
  vessel: ['#EF4444', ['M20,50h68v8h-68z', 'M30,42c8,-12 20,-12 28,0', 'M50,66c8,12 20,12 28,0']],
  whole: ['#34D399', ['M54,16c-8,0 -14,6 -14,14s6,14 14,14 14,-6 14,-14 -6,-14 -14,-14z', 'M40,46h28v30h-8v16h-12v-16h-8z']],
  eye: ['#60A5FA', ['M18,54c12,-20 30,-28 36,-28s24,8 36,28c-12,20 -30,28 -36,28s-24,-8 -36,-28z', 'M54,42a12,12 0,1,1 0,24a12,12 0,1,1 0,-24z', 'M54,49a5,5 0,1,1 0,10a5,5 0,1,1 0,-10z']],
  ear: ['#F9A8D4', ['M40,24c-16,8 -22,28 -14,46 6,14 20,22 34,18 4,-2 6,-6 4,-10 -8,4 -18,2 -24,-8 -6,-12 -4,-26 8,-34 4,-2 4,-8 -2,-10c-2,-1 -4,-2 -6,-2z']],
  tooth: ['#E2E8F0', ['M36,28h12v12c0,20 -4,40 -6,48 -2,-8 -6,-28 -6,-48z', 'M60,28h12v12c0,20 -4,40 -6,48 -2,-8 -6,-28 -6,-48z', 'M34,24h40v10h-40z']],
};

const causes = {
  virus: ['#A855F7', ['M54,30c-12,0 -22,10 -22,22s10,22 22,22 22,-10 22,-22 -10,-22 -22,-22z', 'M54,20v8M54,80v8M20,54h8M80,54h8']],
  bacteria: ['#22C55E', ['M40,40c0,-10 10,-16 20,-12 12,4 16,16 10,26 -4,8 -16,12 -24,6 -8,-4 -10,-12 -6,-20z']],
  allergy: ['#F59E0B', ['M54,20l8,22h24l-20,14 8,24 -20,-14 -20,14 8,-24 -20,-14h24z']],
  injury: ['#EF4444', ['M48,20h12v28h28v12h-28v28h-12v-28h-28v-12h28z']],
  lifestyle: ['#0EA5E9', ['M24,70h60v8h-60z', 'M30,30h12v40h-12z', 'M48,46h12v24h-12z', 'M66,38h12v32h-12z']],
  gene: ['#8B5CF6', ['M30,24c16,20 16,40 0,60', 'M78,24c-16,20 -16,40 0,60', 'M36,40h36M36,54h36M36,68h36']],
  parasite: ['#84CC16', ['M30,54c0,-16 12,-28 24,-20 8,4 10,14 6,22 -2,6 2,12 10,10 10,-2 16,10 8,18 -14,12 -36,6 -44,-10 -4,-8 -4,-14 -4,-20z']],
  other: ['#64748B', ['M40,40h28v28h-28z', 'M48,28h12v12h-12z', 'M48,68h12v12h-12z']],
};

const diseaseIds = [
  'kaze', 'influenza', 'strep', 'chickenpox', 'mumps', 'measles', 'hfmd', 'gastro',
  'foodpoison', 'hayfever', 'atopy', 'hives', 'scratch', 'fracture', 'anemia',
  'myopia', 'cavity', 'otitis', 'cystitis', 'lifestyle_tired',
];
const colors = [
  '#F87171', '#FB923C', '#FBBF24', '#A3E635', '#34D399', '#2DD4BF', '#22D3EE',
  '#38BDF8', '#60A5FA', '#818CF8', '#A78BFA', '#C084FC', '#E879F9', '#F472B6',
  '#FB7185', '#F43F5E', '#E11D48', '#F97316', '#EAB308', '#14B8A6',
];

for (const [id, [color, paths]] of Object.entries(parts)) {
  await write(`parts/${id}.svg`, svg(paths, color));
}
for (const [id, [color, paths]] of Object.entries(causes)) {
  await write(`causes/${id}.svg`, svg(paths, color));
}
for (let i = 0; i < diseaseIds.length; i++) {
  const id = diseaseIds[i];
  const c = colors[i % colors.length];
  await write(
    `diseases/${id}.svg`,
    svg(['M30,28h48v52h-48z', 'M40,40h28v8h-28z', 'M40,56h20v8h-20z', 'M48,74h12v8h-12z'], c),
  );
}

await write(
  'placeholder.svg',
  svg(['M24,30h60v48h-60z', 'M36,48c4,0 8,-4 8,-8s-4,-8 -8,-8 -8,4 -8,8 4,8 8,8z', 'M24,70l18,-18 12,12 18,-22 12,28z'], '#CBD5E1'),
);

await write(
  'body-map.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300" role="img" aria-label="からだ">
  <rect width="200" height="300" fill="#ECFDF5"/>
  <ellipse cx="100" cy="42" rx="28" ry="32" fill="#FDE68A"/>
  <rect x="82" y="72" width="36" height="18" rx="8" fill="#FECACA"/>
  <path fill="#BAE6FD" d="M62 88c-8 24-10 48-8 72h16V88H62zm76 0v72h16c2-24 0-48-8-72h-8z"/>
  <ellipse cx="100" cy="118" rx="14" ry="16" fill="#FDA4AF"/>
  <ellipse cx="78" cy="138" rx="18" ry="14" fill="#D97706" opacity="0.85"/>
  <ellipse cx="122" cy="140" rx="16" ry="14" fill="#F59E0B" opacity="0.85"/>
  <path fill="#FDBA74" d="M72 152c4 28 8 56 12 84h32c4-28 8-56 12-84-14-8-32-8-56 0z"/>
  <rect x="88" y="230" width="24" height="50" rx="10" fill="#FDE68A"/>
</svg>`,
);

console.log('illustrations generated');
