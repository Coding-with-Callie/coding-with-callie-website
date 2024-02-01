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
  dueDate: string;
  zoomSession?: string;
  startDate: string;
  videoDate: string;
  instructionVideo?: string;
  helpfulLinks?: HelpfulLink[];
  solutionText?: string;
  solutionLinks?: SolutionLink[];
};

export const sessions: Session[] = [
  {
    title: "Planning Your Project",
    summary: [
      "Plan out 5 features for your Todo List. After we get the initial project set up, we will work on a feature a week. So, make sure each feature is about a week's worth of work (depending on however much time you have to spend on your application each week). Break the features into user stories and then developer tasks. Your features, stories, and tasks should be detailed enough to pass your trello board to another developer and have them code the project with little to no guidance from you.",
    ],
    deliverable:
      "A link to your Trello board with all 5 features and corresponding stories and tasks.",
    dueDate: "January 25, 2024",
    startDate: "January 18, 2024",
    videoDate: "January 25, 2024",
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
      {
        link: "https://miro.com/welcomeonboard/WXB3ajNEMnJoaTcwM085Wm9KMnRmU1lrVkVPQW1oUUhLZzV1VmE1OHlmbEVzdk1QR01iY3lraWl1TG5ma0dtTnwzNDU4NzY0NTczNzQzMzk0NTU3fDI=?share_link_id=916400630443",
        label:
          "Todo List Design (if you want to build the same application as Callie)",
      },
    ],
    solutionText: "",
    solutionLinks: [
      {
        link: "https://miro.com/welcomeonboard/WXB3ajNEMnJoaTcwM085Wm9KMnRmU1lrVkVPQW1oUUhLZzV1VmE1OHlmbEVzdk1QR01iY3lraWl1TG5ma0dtTnwzNDU4NzY0NTczNzQzMzk0NTU3fDI=?share_link_id=916400630443",
        label: "Wireframe Designs",
        type: "miro-board",
      },
      {
        link: "https://miro.com/welcomeonboard/SHlRQ095Zk0yTGZuWGZuYkRuN1FqZ3VoblppTVlJVWR3NUg5aTF2NnRCNDV5clR4UXc1R2dEUVBDNWpZbGxUQnwzNDU4NzY0NTczNzQzMzk0NTU3fDI=?share_link_id=855413908490",
        label: "API Routes and Database Tables",
        type: "miro-board",
      },
      {
        link: "https://trello.com/b/qjc8wP5R/todo-list-main",
        label: "Project Plan",
        type: "trello-board",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/wireframe_design.mp4",
        label: "Wireframe Designs Walk-Through",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/api_routes_db_tables.mp4",
        label: "API Routes and Database Tables Walk-Through",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/trello_board.mp4",
        label: "Project Plan Walk-Through",
        type: "video",
      },
    ],
  },
  {
    title: "Setting Your Project Up",
    summary: [
      "Create a local project for your Todo List application and link it to a Github repository. Your project should have a React frontend with Chakra UI set up, a NestJS API, and a PostgreSQL database. Your goal is to successfully connect your frontend to your API and your api to your database. The way I would do it, is to make a button on the frontend that when clicked sends a hardcoded Todo to the API which then saves the Todo into a Todo table. Your repository should have a README that gives step-by-step instructions on how to pull down your application and start it.",
    ],
    deliverable:
      "A link to your Todo List Github repository (please make it publicly accessible).",
    dueDate: "February 1, 2024",
    startDate: "January 25, 2024",
    videoDate: "February 1, 2024",
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
    solutionLinks: [
      {
        link: "https://coding-with-callie.s3.amazonaws.com/session_2_connect_fe_be.mp4",
        label: "Frontend and Backend Creation and Connection",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/session_2_connect_database.mp4",
        label: "Database Creation and Connection",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/session_2_db_migrations.mp4",
        label: "Database Migration Set-up",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/zoom_session_2.mp4",
        label: "Zoom Session",
        type: "video",
      },
      {
        link: "https://dev.to/amirfakour/using-typeorm-migration-in-nestjs-with-postgres-database-3c75",
        label: "Helpful Database Migration Guide",
        type: "how-to guide",
      },
    ],
  },
  {
    title: "Feature 1",
    summary: [
      "Use your Trello board to complete your first feature. It's okay if you need to change the scope of your feature as the goal is to have your feature ready for review by the end of the week.",
      "Imagine that you are submitting your feature to your Tech Lead, a QA engineer, or Product/Design for review. You want the feature to be complete and as bug-free as possible so you can move on to your next feature.",
      "Take time to validate any input fields, manually test edge cases, and add catch blocks to your requests for error handling.",
      "We are also going to start practicing our Github workflow. When you are ready to work on your feature, check out a new branch. Once you feel good about your progress and don't think you're introducing any big bugs to your main branch, create a pull request. It will feel a bit extra when you're working on your own, but it'll end up saving you down the line!",
      "You'll submit your pull request as your deliverable. Once your receive your feedback, you can edit your code and then commit your edits and merge back into the main branch. Reviewers should pull down the code, checkout the feature branch, get the project runnning, and do manual testing in addition to reviewing the code. So, please update your README with any instructions necessary for reviewers to pull and run your branch. Include your trello board link in your README too.",
    ],
    deliverable:
      "A link to your feature-1 pull request on your Github repository.",
    dueDate: "February 8, 2024",
    startDate: "February 1, 2024",
    videoDate: "February 8, 2024",
    instructionVideo:
      "https://coding-with-callie.s3.amazonaws.com/video1451208720.mp4",
  },
  {
    title: "Feature 2",
    summary: [
      "Complete the user stories and developer tasks for feature 2. Make sure to update your README with any instructions necessary for reviewers to pull and run your branch. Include your trello board link in your README.",
    ],
    deliverable: "A link to your feature-2 branch on your Github repository.",
    dueDate: "February 15, 2024",
    startDate: "February 8, 2024",
    videoDate: "February 15, 2024",
  },
  {
    title: "Feature 3",
    summary: [
      "Complete the user stories and developer tasks for feature 3. Make sure to update your README with any instructions necessary for reviewers to pull and run your branch. Include your trello board link in your README.",
    ],
    deliverable: "A link to your feature-3 branch on your Github repository.",
    dueDate: "February 22, 2024",
    startDate: "February 15, 2024",
    videoDate: "February 22, 2024",
  },
  {
    title: "Feature 4",
    summary: [
      "Complete the user stories and developer tasks for feature 4. Make sure to update your README with any instructions necessary for reviewers to pull and run your branch. Include your trello board link in your README.",
    ],
    deliverable: "A link to your feature-4 branch on your Github repository.",
    dueDate: "February 29, 2024",
    startDate: "February 22, 2024",
    videoDate: "February 29, 2024",
  },
  {
    title: "Feature 5",
    summary: [
      "Complete the user stories and developer tasks for feature 5. Make sure to update your README with any instructions necessary for reviewers to pull and run your branch. Include your trello board link in your README.",
    ],
    deliverable: "A link to your feature-5 branch on your Github repository.",
    dueDate: "March 7, 2024",
    startDate: "February 29, 2024",
    videoDate: "March 7, 2024",
  },
  {
    title: "Finish Remaining Tasks",
    summary: [""],
    deliverable: "",
    dueDate: "March 21, 2024",
    zoomSession: "N/A - work independently to wrap your features up!",
    startDate: "March 7, 2024",
    videoDate: "March 21, 2024",
  },
  {
    title: "Logging",
    summary: [""],
    deliverable: "",
    dueDate: "March 28, 2024",
    startDate: "March 21, 2024",
    videoDate: "March 28, 2024",
  },
  {
    title: "Manual E2E Testing",
    summary: [""],
    deliverable: "",
    dueDate: "April 4, 2024",
    startDate: "March 28, 2024",
    videoDate: "April 4, 2024",
  },
  {
    title: "Automated Spec Testing",
    summary: [""],
    deliverable: "",
    dueDate: "April 11, 2024",
    startDate: "April 4, 2024",
    videoDate: "April 11, 2024",
  },
];
