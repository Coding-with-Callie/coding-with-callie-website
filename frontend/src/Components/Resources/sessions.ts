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
  summary: string;
  deliverable: string;
  dueDate: string;
  startDate: string;
  videoDate: string;
  instructionVideo?: string;
  helpfulLinks?: HelpfulLink[];
  solutionLinks?: SolutionLink[];
};

export const sessions: Session[] = [
  {
    title: "Planning Your Project",
    summary:
      "Plan out 5 features for your Todo List. After we get the initial project set up, we will work on a feature a week. So, make sure each feature is about a week's worth of work (depending on however much time you have to spend on your application each week). Break the features into user stories and then developer tasks. Your features, stories, and tasks should be detailed enough to pass your trello board to another developer and have them code the project with little to no guidance from you.",
    deliverable:
      "A link to your Trello board with all 5 features and corresponding stories and tasks.",
    dueDate: "January 18, 2024",
    startDate: "January 11, 2024",
    videoDate: "January 20, 2024",
    instructionVideo:
      "https://coding-with-callie.s3.amazonaws.com/planning-a-project-assignment.mp4",
    helpfulLinks: [
      {
        link: "https://trello.com/w/calliestodolist",
        label: "Trello Template",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/trello_template.mp4",
        label: "Trello Template Video Walkthrough",
      },
    ],
    solutionLinks: [
      {
        link: "https://miro.com/welcomeonboard/WXB3ajNEMnJoaTcwM085Wm9KMnRmU1lrVkVPQW1oUUhLZzV1VmE1OHlmbEVzdk1QR01iY3lraWl1TG5ma0dtTnwzNDU4NzY0NTczNzQzMzk0NTU3fDI=?share_link_id=382989233379",
        label: "Wireframe Designs",
        type: "miro-board",
      },
      {
        link: "https://trello.com/w/todolist07059372",
        label: "Trello Board",
        type: "trello-board",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/session_1_solution_part_1.mp4",
        label: "Part 1",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/session_1_solution_part_2.mp4",
        label: "Part 2",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/session_1_solution_part_3.mp4",
        label: "Part 3",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/session_1_solution_part_4.mp4",
        label: "Part 4",
        type: "video",
      },
    ],
  },
  {
    title: "Setting Your Project Up",
    summary:
      "Create a local project for your Todo List application and link it to a Github repository. Your project should have a React frontend with Chakra UI set up, a NestJS API, and a PostgreSQL database. Your goal is to successfully connect your frontend to your API and your api to your database. The way I would do it, is to make a button on the frontend that when clicked sends a hardcoded Todo to the API which then saves the Todo into a Todo table. Your repository should have a README that gives step-by-step instructions on how to pull down your application and start it.",
    deliverable:
      "A link to your Todo List Github repository (please make it publicly accessible).",
    dueDate: "January 25, 2024",
    startDate: "January 18, 2024",
    videoDate: "January 27, 2024",
    instructionVideo:
      "https://coding-with-callie.s3.amazonaws.com/session-2.mp4",
    helpfulLinks: [
      {
        link: "https://create-react-app.dev/docs/adding-typescript/",
        label: "Create React App with TypeScript",
      },
      {
        link: "https://chakra-ui.com/getting-started",
        label: "Chakra UI Documentation",
      },
      { link: "https://docs.nestjs.com/", label: "NestJS Documentation" },
      {
        link: "https://docs.nestjs.com/techniques/database",
        label: "NestJS - How to set up a database",
      },
    ],
  },
  {
    title: "Feature 1",
    summary:
      "Complete the user stories and developer tasks for feature 1. Make sure to update your README with any instructions necessary for reviewers to pull and run your branch. Include your trello board link in your README.",
    deliverable: "A link to your feature-1 branch on your Github repository.",
    dueDate: "February 1, 2024",
    startDate: "January 25, 2024",
    videoDate: "February 3, 2024",
  },
  {
    title: "Feature 2",
    summary:
      "Complete the user stories and developer tasks for feature 2. Make sure to update your README with any instructions necessary for reviewers to pull and run your branch. Include your trello board link in your README.",
    deliverable: "A link to your feature-2 branch on your Github repository.",
    dueDate: "February 8, 2024",
    startDate: "February 1, 2024",
    videoDate: "February 10, 2024",
  },
  {
    title: "Feature 3",
    summary:
      "Complete the user stories and developer tasks for feature 3. Make sure to update your README with any instructions necessary for reviewers to pull and run your branch. Include your trello board link in your README.",
    deliverable: "A link to your feature-3 branch on your Github repository.",
    dueDate: "February 15, 2024",
    startDate: "February 8, 2024",
    videoDate: "February 17, 2024",
  },
  {
    title: "Feature 4",
    summary:
      "Complete the user stories and developer tasks for feature 4. Make sure to update your README with any instructions necessary for reviewers to pull and run your branch. Include your trello board link in your README.",
    deliverable: "A link to your feature-4 branch on your Github repository.",
    dueDate: "February 22, 2024",
    startDate: "February 15, 2024",
    videoDate: "February 24, 2024",
  },
  {
    title: "Feature 5",
    summary:
      "Complete the user stories and developer tasks for feature 5. Make sure to update your README with any instructions necessary for reviewers to pull and run your branch. Include your trello board link in your README.",
    deliverable: "A link to your feature-5 branch on your Github repository.",
    dueDate: "February 29, 2024",
    startDate: "February 22, 2024",
    videoDate: "March 2, 2024",
  },
];
