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
  {
    title: "Project Set-up",
    summary: "Create a Github repository for your Todo List application. Your repo should have a React frontend with Chakra UI set up, a NestJS api, and a README that gives step-by-step details on how to pull down your application and start it.",
    deliverable: "A link to your Todo List Github repository.",
    dueDate: "January 25, 2024"
  },
  {
    title: "Feature 1",
    summary: "Complete the user stories and developer tasks for feature 1. Make sure to update your README with any instructions necessary for reviewers to pull and run your branch. Include your trello board link in your README.",
    deliverable: "A link to your feature-1 branch on your Github repository.",
    dueDate: "February 1, 2024"
  },
  {
    title: "Feature 2",
    summary: "Complete the user stories and developer tasks for feature 2. Make sure to update your README with any instructions necessary for reviewers to pull and run your branch. Include your trello board link in your README.",
    deliverable: "A link to your feature-2 branch on your Github repository.",
    dueDate: "February 8, 2024"
  },
  {
    title: "Feature 3",
    summary: "Complete the user stories and developer tasks for feature 3. Make sure to update your README with any instructions necessary for reviewers to pull and run your branch. Include your trello board link in your README.",
    deliverable: "A link to your feature-3 branch on your Github repository.",
    dueDate: "February 15, 2024"
  },
  {
    title: "Feature 4",
    summary: "Complete the user stories and developer tasks for feature 4. Make sure to update your README with any instructions necessary for reviewers to pull and run your branch. Include your trello board link in your README.",
    deliverable: "A link to your feature-4 branch on your Github repository.",
    dueDate: "February 22, 2024"
  },
  {
    title: "Feature 5",
    summary: "Complete the user stories and developer tasks for feature 5. Make sure to update your README with any instructions necessary for reviewers to pull and run your branch. Include your trello board link in your README.",
    deliverable: "A link to your feature-5 branch on your Github repository.",
    dueDate: "February 29, 2024"
  }
];