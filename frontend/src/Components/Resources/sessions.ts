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

export const sessions: Session[] = [
  {
    title: "Planning Your Project",
    summary: [
      "Plan out 5 features for your Todo List. After we get the initial project set up, we will work on a feature a week. So, make sure each feature is about a week's worth of work (depending on however much time you have to spend on your application each week). Break the features into user stories and then developer tasks. Your features, stories, and tasks should be detailed enough to pass your trello board to another developer and have them code the project with little to no guidance from you.",
    ],
    deliverable:
      "A link to your Trello board with all 5 features and corresponding stories and tasks.",
    startDate: "January 25, 2024",
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
    startDate: "January 25, 2024",
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
    startDate: "February 1, 2024",
    instructionVideo:
      "https://coding-with-callie.s3.amazonaws.com/video1451208720.mp4",
    helpfulLinks: [
      {
        link: "https://trello.com/b/nRa5Z9RJ/user-account-creation",
        label: "Callie's User Account Creation Trello Board",
      },
    ],
    solutionLinks: [
      {
        link: "https://coding-with-callie.s3.amazonaws.com/video1822359443.mp4",
        label: "Zoom Session",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_1_git_workflow.mp4",
        label: "Git/Github Workflow",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_1_part_1.mp4",
        label: "Sign-up Form: React Router and Initial Form Set-up",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_1_part_2.mp4",
        label: "Sign-up Form: Form control and Error Messages",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_1_part_3.mp4",
        label: "Sign-up Form: Data Validation",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_1_part_4.mp4",
        label: "API: Sanitize, Validate, and Transform Sign-up DTO",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_1_part_5.mp4",
        label: "Sign-up Form: Finish FE Work",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_1_part_6.mp4",
        label: "API: Password Hashing and Saving New Users in DB",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_1_part_7.mp4",
        label: "API: JWT and Sign-up Error Handling",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_1_part_8.mp4",
        label: "API: Auth Guard Set-up",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_1_part_9.mp4",
        label: "NestJS: JWT Environment Variable Set-up",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_1_part_10.mp4",
        label: "Frontend: Login Functionality",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_1_part_11.mp4",
        label: "API: Login Functionality",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_1_part_12.mp4",
        label: "Logout Functionality",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_1_part_13.mp4",
        label: "Header: Initial Navigation Set-up",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_1_part_14.mp4",
        label: "Chakra UI: Standalone Toasts",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_1_part_15.mp4",
        label: "Header: Finish Navigation",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_1_part_16.mp4",
        label: "Git/Github: Review Pull Request and Merge into Main",
        type: "video",
      },
      {
        link: "https://docs.nestjs.com/security/authentication",
        label: "NestJS Authentication Documentation",
        type: "how-to guide",
      },
      {
        link: "https://chakra-ui.com/docs/components/form-control",
        label: "Chakra UI Form Control",
        type: "how-to guide",
      },
    ],
  },
  {
    title: "Feature 2",
    instructionVideo:
      "https://coding-with-callie.s3.amazonaws.com/feature_2_assignment.mp4",
    summary: [
      "Complete the user stories and developer tasks for feature 2. Make sure to update your README with any instructions necessary for reviewers to clone your project and get it running on their computer. Include your trello board link in your README.",
    ],
    helpfulLinks: [
      {
        link: "https://trello.com/b/8I2sGaO1/user-account-maintenance",
        label: "Callie's User Account Maintenance Trello Board",
      },
    ],
    deliverable: "A link to your feature-2 branch on your Github repository.",
    startDate: "February 8, 2024",
    solutionLinks: [
      {
        link: "https://melodiessim.netlify.app/Reset%20Password%20Flow%20Using%20JWT/",
        label: "Implement Password Reset Using JWT",
        type: "how-to guide",
      },
      {
        link: "https://ahrjarrett.com/posts/2019-02-08-resetting-user-passwords-with-node-and-jwt",
        label: "Resetting a User’s Password Using Node.js and JWT",
        type: "how-to guide",
      },
      {
        link: "https://medium.com/@y.mehnati_49486/how-to-send-an-email-from-your-gmail-account-with-nodemailer-837bf09a7628",
        label: "How to Send an Email from Your Gmail Account with Nodemailer",
        type: "how-to guide",
      },
      {
        link: "https://www.smashingmagazine.com/2017/11/safe-password-resets-with-json-web-tokens/",
        label: "Creating Secure Password Resets With JSON Web Tokens",
        type: "how-to guide",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/video1096901020.mp4",
        label: "Zoom Session",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_2_part_1.mp4",
        label: "UI: Create Account Details Components",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_2_part_2.mp4",
        label: "Add Edit Account Details Functionality to UI and API",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_2_part_3.mp4",
        label: "Refresh Profile Data on Account Details Edit",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_2_part_4.mp4",
        label: "UI: Forgot Password Button and Modal",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_2_part_5.mp4",
        label: "Create Password Reset JWT and Initialize Mail Module",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_2_part_6.mp4",
        label: "Send Password Reset Email with Nodemailer",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_2_part_7.mp4",
        label: "Verify Reset Password Token and Save New Password",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_2_part_8.mp4",
        label: "Add Delete Account Functionality",
        type: "video",
      },
    ],
  },
  {
    title: "Feature 3",
    instructionVideo:
      "https://coding-with-callie.s3.amazonaws.com/video1929162466.mp4",
    helpfulLinks: [
      {
        link: "https://trello.com/b/fip2iHxH/create-project-workflow",
        label: "Callie's Create Project Workflow Trello Board",
      },
      {
        link: "https://miro.com/app/board/uXjVN34K4k0=/",
        label: "Callie's Wireframe Designs",
      },
    ],
    summary: [
      "Complete the user stories and developer tasks for feature 3. Make sure to update your README with any instructions necessary for reviewers to clone your project and get it running on their computer. Include your trello board link in your README.",
    ],
    deliverable: "A link to your feature-3 branch on your Github repository.",
    startDate: "February 15, 2024",
    solutionLinks: [
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_3_part_1.mp4",
        label: "UI: Projects Page",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_3_part_2.mp4",
        label: "UI: Created Project Accordion",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_3_part_3.mp4",
        label: "API: Create Project Route and Project Table",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_3_part_4.mp4",
        label: "Wrapped Up Create Project User Story",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_3_part_5.mp4",
        label: "Create Project Details Page with Loader Function",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_3_part_6.mp4",
        label: "UI: Build Project Page Components",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_3_part_7.mp4",
        label: "UI: Create Feature Accordion",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_3_part_8.mp4",
        label:
          "API: Add Feature Table to Database and Necessary Feature Functions",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_3_part_9.mp4",
        label: "Created Feature Modal with List of User Stories",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_3_part_10.mp4",
        label: "UI: Create User Story Accordion",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_3_part_11.mp4",
        label:
          "API: Add User Story Table to Database and Necessary User Story Function",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_3_part_12.mp4",
        label: "Bug: Fixed User Story List Update",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_3_part_13.mp4",
        label: "UI: Create Developer Tasks",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_3_part_14.mp4",
        label:
          "API: Add Developer Task Table to Database and Necessary Task Functions",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_3_part_15.mp4",
        label: "In-Depth Refactor of How Data Flows Through Components",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_3_part_16.mp4",
        label:
          "API: Used Postman to Test Create Routes and Edited Functions so Unauthorized Errors are Thrown Correctly",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_3_part_17.mp4",
        label:
          "API: Added Logic To Calculate Project, Feature, and User Story Statuses",
        type: "video",
      },
      {
        link: "https://chakra-ui.com/docs/components/accordion/usage",
        label: "Chakra UI Accordion Component",
        type: "how-to",
      },
      {
        link: "https://orkhan.gitbook.io/typeorm/docs/many-to-one-one-to-many-relations",
        label: "Typeorm Relations",
        type: "how-to",
      },
    ],
  },
  {
    title: "Feature 4",
    summary: [
      "Complete the user stories and developer tasks for feature 4. Make sure to update your README with any instructions necessary for reviewers to clone your project and get it running on their computer. Include your trello board link in your README.",
    ],
    deliverable: "A link to your feature-4 branch on your Github repository.",
    startDate: "February 21, 2024",
    instructionVideo:
      "https://coding-with-callie.s3.amazonaws.com/video1039934819.mp4",
    helpfulLinks: [
      {
        link: "https://trello.com/b/IasXbjoo/edit-project-workflow",
        label: "Callie's Edit Project Workflow Trello Board",
      },
      {
        link: "https://miro.com/app/board/uXjVN34K4k0=/",
        label: "Callie's Wireframe Designs",
      },
    ],
    solutionLinks: [
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_4_part_1.mp4",
        label: "Started Work on Update Task Functionality",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_4_part_2.mp4",
        label: "API: Finished Backend Logic to Update a Task",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_4_part_3.mp4",
        label: "UI: Added Components Necessary to Edit Task Name",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_4_part_4.mp4",
        label:
          "Bug: Fixed Bug Where Modal Would Close When Task Status Changed Feature Status",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_4_part_5.mp4",
        label: "UI: Added Components Necessary to Edit User Story Name",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_4_part_6.mp4",
        label:
          "Bug/API: Refactored User Story Name UI and Added Backend Logic to Update User Story",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_4_part_7.mp4",
        label: "UI: Added Components Necessary to Edit User Story Description",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_4_part_8.mp4",
        label:
          "UI: Added Components and Logic to Edit Feature Name and Description",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_4_part_9.mp4",
        label: "API: Added Backend Logic to Update Feature",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_4_part_10.mp4",
        label: "Added All Logic and Components to Update Project",
        type: "video",
      },
    ],
  },
  {
    title: "Feature 5",
    summary: [
      "Complete the user stories and developer tasks for feature 5. Make sure to update your README with any instructions necessary for reviewers to clone your project and get it running on their computer. Include your trello board link in your README.",
    ],
    deliverable: "A link to your feature-5 branch on your Github repository.",
    startDate: "February 28, 2024",
    instructionVideo:
      "https://coding-with-callie.s3.amazonaws.com/video1857553594.mp4",
    helpfulLinks: [
      {
        link: "https://trello.com/b/c62G8Szs/delete-project-workflow",
        label: "Callie's Delete Project Workflow Trello Board",
      },
      {
        link: "https://miro.com/app/board/uXjVN34K4k0=/",
        label: "Callie's Wireframe Designs",
      },
    ],
    solutionLinks: [
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_5_part_1.mp4",
        label: "Bug: Fixed Create Task User Story Status Update",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_5_part_2.mp4",
        label: "Completed Task Deletion",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_5_part_3.mp4",
        label: "Bug: Fixed Task List on Task Deletion",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_5_part_4.mp4",
        label: "UI/API: Started User Story Deletion",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_5_part_5.mp4",
        label: "UI: Added Agnostic Delete Confirmation Modal",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_5_part_6.mp4",
        label: "UI/Bug: Fixed Accordion Automatically Opening on Delete Click",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_5_part_7.mp4",
        label: "UI/API: Feature Deletion",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/feature_5_part_8.mp4",
        label: "UI/API: Project Deletion",
        type: "video",
      },
    ],
  },
  {
    title: "Styling and Responsive Design",
    summary: [
      "Now that your project works as intended, it's time to make it look good on all devices. You can match my styling, but that's not super fun. Go ahead and be creative and make your project look exactly how you want it too! Use your browser's DevTools to test how each page and component looks on different screen sizes. Make sure to update your README with any instructions necessary for reviewers to clone your project and get it running on their computer. Include your trello board link in your README.",
    ],
    deliverable: "A link to your style branch on your Github repository.",
    startDate: "March 6, 2024",
    instructionVideo:
      "https://coding-with-callie.s3.amazonaws.com/style_and_responsive_task.mp4",
    helpfulLinks: [
      {
        link: "https://trello.com/b/qjc8wP5R/todo-list-main",
        label: "Callie's Todo List Main Trello Board",
      },
      {
        link: "https://miro.com/app/board/uXjVN34K4k0=/",
        label: "Callie's Wireframe Designs",
      },
    ],
    solutionLinks: [
      {
        link: "https://coding-with-callie.s3.amazonaws.com/style_part_1.mp4",
        label: "UI: Added Body Background Color and Edited Sloth Logo",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/style_part_2.mp4",
        label: "UI: Added Fonts and Font Colors for Heading and Text",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/style_part_3.mp4",
        label: "UI: Styled Projects Page",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/style_part_4.mp4",
        label:
          "UI: Styled Project Status Columns and Buttons on Individual Project Page",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/style_part_5.mp4",
        label:
          "UI: Continued Updating Buttons and Started Styling Feature Modal",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/style_part_6.mp4",
        label: "UI: Styled Log-in, Sign-up, and Reset Password Pages",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/style_part_7.mp4",
        label: "UI: Styled Create Task Accordion and Task Box",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/style_part_8.mp4",
        label: "UI: Started Making Header Responsive",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/style_part_9.mp4",
        label: "UI: Finished Making Header Responsive",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/style_part_10.mp4",
        label: "UI: Made Log-in and Sign-up Pages Responsive",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/style_part_11.mp4",
        label: "UI: Made Account Details Page Responsive",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/style_part_12.mp4",
        label: "UI: Made Projects Page Responsive",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/style_part_13.mp4",
        label: "UI: Made Individual Project Page Responsive",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/style_part_14.mp4",
        label: "UI: Made Feature Modal Responsive",
        type: "video",
      },
      {
        link: "https://chakra-ui.com/docs/styled-system/customize-theme",
        label: "Chakra UI Customize Theme",
        type: "how-to",
      },
      {
        link: "https://chakra-ui.com/docs/hooks/use-media-query",
        label: "Chakra UI Media Queries",
        type: "how-to",
      },
    ],
  },
  {
    title: "Manual E2E Testing",
    summary: [
      "Go through each user story on each feature within your MVP and manually test it. Try to think of all the edge cases you can and try to 'break' your application.",
      "Compile a list of bugs and then fix them; however, please note that you'll need to retest any user stories that could have been affected by your fix. Sometimes, fixing a bug creates a new one!",
      "This is a great time to enlist the help of friends and family to try out your application and report any issues they find with it.",
    ],
    deliverable:
      "A link to your manual testing branch on your Github repository.",
    startDate: "March 18, 2024",
    helpfulLinks: [
      {
        link: "https://trello.com/b/qjc8wP5R/todo-list-main",
        label: "Callie's Todo List Main Trello Board",
      },
      {
        link: "https://miro.com/app/board/uXjVN34K4k0=/",
        label: "Callie's Wireframe Designs",
      },
    ],
    instructionVideo:
      "https://coding-with-callie.s3.amazonaws.com/manual_testing_assignment.mp4",
    solutionLinks: [
      {
        link: "https://coding-with-callie.s3.amazonaws.com/manual_testing_part_1.mp4",
        label: "Manually Tested User Account Creation Feature",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/manual_testing_part_2.mp4",
        label:
          "Add Basic Home Page and Navigation Based on User's Log-in Status",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/manual_testing_part_3.mp4",
        label:
          "Added Redirects to Log-in and Sign-up Pages when User is Logged In and Fixed Responsive UI Issues",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/manual_testing_part_4.mp4",
        label: "Manually Tested User Account Maintenance",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/manual_testing_part_5.mp4",
        label:
          "Bug Fix: User could edit username and email to match existing user",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/manual_testing_part_6.mp4",
        label:
          "Bug Fix: User could accidentally save dummy asteriks as password",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/manual_testing_part_7.mp4",
        label: "Bug Fix: User could reset non-matching passwords",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/manual_testing_part_8.mp4",
        label:
          "Bug Fix: User could not delete account if they had any projects started",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/manual_testing_part_9.mp4",
        label: "Manually Tested Create Project Workflow Part 1",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/manual_testing_part_10.mp4",
        label: "Manually Tested Create Project Workflow Part 2",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/manual_testing_part_11.mp4",
        label:
          "Bug Fix: Header did not update logged in status when JWT expired",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/manual_testing_part_12.mp4",
        label: "Manually Tested Edit Project Workflow",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/manual_testing_part_13.mp4",
        label: "Bug Fix: Frontend would send requests to API unnecessarily",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/manual_testing_part_14.mp4",
        label: "Manually Tested Delete Project Workflow",
        type: "video",
      },
    ],
  },
  {
    title: "Automated Spec Testing",
    summary: [
      "Move to the backend of your repository and write automated tests for each service and controller. Your goal is to test the smallest unit of code you can at a time; so, you'll be mocking a lot of dependencies.",
    ],
    deliverable:
      "A link to your spec/unit testing branch on your Github repository.",
    startDate: "March 25, 2024",
    instructionVideo:
      "https://coding-with-callie.s3.amazonaws.com/unit_testing_assignment.mp4",
    helpfulLinks: [
      {
        link: "https://trello.com/b/qjc8wP5R/todo-list-main",
        label: "Callie's Todo List Main Trello Board",
      },
      {
        link: "https://miro.com/app/board/uXjVN34K4k0=/",
        label: "Callie's Wireframe Designs",
      },
    ],
    solutionLinks: [
      {
        link: "https://dev.to/niemet0502/writing-unit-tests-for-your-nestjs-rest-api-3cgg",
        label: "Writing Unit Tests for your Nestjs Rest API",
        type: "how-to",
      },
      {
        link: "https://www.tomray.dev/nestjs-unit-testing",
        label: "NestJS unit testing: A how-to guide with examples",
        type: "how-to",
      },
      {
        link: "https://dev.to/ehsaantech/mastering-unit-testing-with-nestjs-37g9",
        label: "Mastering Unit Testing With NestJS",
        type: "how-to",
      },
      {
        link: "https://docs.nestjs.com/fundamentals/testing",
        label: "NestJS Testing Docs",
        type: "how-to",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/unit_testing_part_1.mp4",
        label: "User Service Spec Tests: Part 1",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/unit_testing_part_2.mp4",
        label: "User Service Spec Tests: Part 2",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/unit_testing_part_3.mp4",
        label: "Task Service Spec Tests: Part 1",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/unit_testing_part_4.mp4",
        label: "Task Service Spec Tests: Part 2",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/unit_testing_part_5.mp4",
        label: "Task Service Spec Tests: Part 3",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/unit_testing_part_6.mp4",
        label: "User Story Service Spec Tests: Part 1",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/unit_testing_part_7.mp4",
        label: "User Story Service Spec Tests: Part 2",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/unit_testing_part_8.mp4",
        label: "User Story Service Spec Tests: Part 3",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/unit_testing_part_9.mp4",
        label: "Feature Service Spec Tests: Part 1",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/unit_testing_part_10.mp4",
        label: "Feature Service Spec Tests: Part 2",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/unit_testing_part_11.mp4",
        label: "Project Service Spec Tests: Part 1",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/unit_testing_part_12.mp4",
        label: "Project Service Spec Tests: Part 2",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/unit_testing_part_13.mp4",
        label: "Project Service Spec Tests: Part 3",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/unit_testing_part_14.mp4",
        label: "Auth Service Spec Tests: Part 1",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/unit_testing_part_15.mp4",
        label: "Auth Service Spec Tests: Part 2",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/unit_testing_part_16.mp4",
        label: "Auth Service Spec Tests: Part 3",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/unit_testing_part_17.mp4",
        label: "Auth Service Spec Tests: Part 4",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/unit_testing_part_18.mp4",
        label: "Auth Service Spec Tests: Part 5",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/unit_testing_part_19.mp4",
        label: "Auth Service Spec Tests: Part 6",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/unit_testing_part_20.mp4",
        label: "Auth Service Spec Tests: Part 7",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/unit_testing_part_21.mp4",
        label: "Auth Service Spec Tests: Part 8",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/unit_testing_part_22.mp4",
        label: "Auth Service Spec Tests: Part 9",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/unit_testing_part_23.mp4",
        label: "Auth Service Spec Tests: Part 10",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/unit_testing_part_24.mp4",
        label: "Auth Service Spec Tests: Part 11",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/unit_testing_part_25.mp4",
        label: "Auth Service Spec Tests: Part 12",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/unit_testing_part_26.mp4",
        label: "Auth Service Spec Tests: Part 13",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/unit_testing_part_27.mp4",
        label: "Auth Controller Spec Tests: Part 1",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/unit_testing_part_28.mp4",
        label: "Auth Controller Spec Tests: Part 2",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/unit_testing_part_29.mp4",
        label: "Auth Controller Spec Tests: Part 3",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/unit_testing_part_30.mp4",
        label: "Auth Controller Spec Tests: Part 4",
        type: "video",
      },
      {
        link: "https://coding-with-callie.s3.amazonaws.com/unit_testing_part_31.mp4",
        label: "Send Password Reset Email Unit Tests",
        type: "video",
      },
    ],
  },
];
