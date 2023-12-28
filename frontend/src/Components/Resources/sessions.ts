export type Session = {
  title: string;
  summary: string;
  deliverable: string;
  dueDate: string;
}

export const sessions: Session[] = [
  {
    title: "Planning Your Project",
    summary:
      "Plan out 5 features for your Todo List. After we get the initial project set up, we will work on a feature a week, so make sure each feature is about a week's worth of work. Break the features into user stories and then developer tasks.",
    deliverable:
      "A link to your Trello board with all 5 features and corresponding stories and tasks.",
    dueDate: "January 18, 2024",
  },
];