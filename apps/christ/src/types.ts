export interface Prophecy {
  id: string;
  title: string;
  scriptureRef: string;
  scriptureText: string;
  fulfillmentRef: string;
  fulfillmentText: string;
  context: string;
  qumranEvidence: string;
  stonerProbability: number; // probability value, e.g., 280000 means 1 in 280,000
  stonerLabel: string; // e.g. "1 in 2.8 × 10^5"
}

export interface TombTheory {
  id: string;
  name: string;
  tagline: string;
  description: string;
  keyPoints: string[];
  refutations: string[];
  scores: {
    logicalCoherence: number; // 1-10
    textualAdherence: number; // 1-10
    militaryFeasibility: number; // 1-10
  };
}

export interface Eyewitness {
  id: string;
  name: string;
  subtitle: string;
  preConversion: string;
  encounter: string;
  postEncounter: string;
  martyrdom: string;
  uniqueness: string;
}

export interface ForensicPillar {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  narrative: string;
  evidencePoints: {
    label: string;
    details: string;
  }[];
  comparisons?: {
    subject: string;
    manuscripts: number;
    manuscriptsLabel: string;
    timeGapYears: number;
    timeGapLabel: string;
  }[];
  discoveries?: {
    name: string;
    year: string;
    location: string;
    details: string;
  }[];
  medicalAnatomy?: {
    symptom: string;
    clinicalEffect: string;
    evidenceText: string;
  }[];
  sociologicalTakeaways?: string[];
}

export interface ChatMessage {
  role: "user" | "model";
  text: string;
  timestamp: Date;
  warning?: boolean;
}
