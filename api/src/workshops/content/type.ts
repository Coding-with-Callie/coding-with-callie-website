export type Workshop = {
  name: string;
  description: string;
  photo: string;
  details: string[];
  objectives: string[];
  techStack: string[];
  price: number;
  available: boolean;
  stripeId: string;
  sessions: Session[];
};

export type Session = {
  title: string;
  summary: string[];
  deliverable: string;
  startDate: string;
  instructionVideo?: string;
  helpfulLinks?: HelpfulLink[];
  solutionText?: string;
  solutionLinks?: SolutionLink[];
};

export type HelpfulLink = {
  link: string;
  label: string;
};

export type SolutionLink = {
  link: string;
  label: string;
  type: string;
};
