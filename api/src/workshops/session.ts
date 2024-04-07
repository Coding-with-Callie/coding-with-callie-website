export type HelpfulLink = {
  link: string;
  label: string;
};

export type SolutionLink = {
  link: string;
  label: string;
  type: string;
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
