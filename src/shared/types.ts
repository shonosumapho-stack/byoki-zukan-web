export interface BodyPart {
  id: string;
  name: string;
  nameRuby: string;
  illustration: string;
  roleRuby: string;
  howItWorksRuby: string;
  careTipRuby: string;
  triviaRuby: string;
}

export interface Cause {
  id: string;
  name: string;
  nameRuby: string;
  icon: string;
  summaryRuby: string;
}

export interface QuizHints {
  siteRuby: string;
  causeRuby: string;
  symptomRuby: string;
}

export interface Disease {
  id: string;
  name: string;
  nameRuby: string;
  bodyPartIds: string[];
  causeIds: string[];
  symptomsRuby: string;
  summaryRuby: string;
  detailRuby: string;
  careRuby: string;
  triviaRuby: string;
  agentRuby: string;
  illustration: string;
  quizHints: QuizHints;
}

export interface QuizQuestion {
  disease: Disease;
  choices: Disease[];
}

export interface DiseaseDataRoot {
  bodyParts: BodyPart[];
  causes: Cause[];
  diseases: Disease[];
}
