import type { BodyPart, Cause, Disease, DiseaseDataRoot, QuizQuestion } from './types';

let cache: DiseaseDataRoot | null = null;

export async function loadDiseaseData(): Promise<DiseaseDataRoot> {
  if (cache) return cache;
  const res = await fetch('/assets/diseases.json');
  if (!res.ok) throw new Error('diseases.json の読み込みに失敗しました');
  cache = (await res.json()) as DiseaseDataRoot;
  return cache;
}

export function bodyPartById(data: DiseaseDataRoot, id: string): BodyPart | undefined {
  return data.bodyParts.find((p) => p.id === id);
}

export function causeById(data: DiseaseDataRoot, id: string): Cause | undefined {
  return data.causes.find((c) => c.id === id);
}

export function diseaseById(data: DiseaseDataRoot, id: string): Disease | undefined {
  return data.diseases.find((d) => d.id === id);
}

export function diseasesForBodyPart(data: DiseaseDataRoot, bodyPartId: string): Disease[] {
  return data.diseases.filter((d) => d.bodyPartIds.includes(bodyPartId));
}

export function diseasesForCause(data: DiseaseDataRoot, causeId: string): Disease[] {
  return data.diseases.filter((d) => d.causeIds.includes(causeId));
}

export function bodyPartsFor(data: DiseaseDataRoot, disease: Disease): BodyPart[] {
  return disease.bodyPartIds.map((id) => bodyPartById(data, id)).filter((p): p is BodyPart => !!p);
}

export function causesFor(data: DiseaseDataRoot, disease: Disease): Cause[] {
  return disease.causeIds.map((id) => causeById(data, id)).filter((c): c is Cause => !!c);
}

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function makeQuiz(data: DiseaseDataRoot, count = 5): QuizQuestion[] {
  const pool = shuffle(data.diseases).slice(0, Math.min(count, data.diseases.length));
  return pool.map((correct) => {
    const wrong = shuffle(data.diseases.filter((d) => d.id !== correct.id)).slice(0, 3);
    const choices = shuffle([...wrong, correct]);
    return { disease: correct, choices };
  });
}
