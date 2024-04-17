import { Workshop } from './type';

// create a deployment workshop of type Workshop
export const deployment: Workshop = {
  name: 'Deploy in Public Challenge',
  description:
    "Deploying an application is HARD. Knowing what resources to use, what steps to follow, and what to do when you get stuck can feel impossible. In this 10 week workshop, we'll start simple and work our way up to deploying a fullstack application using AWS, Docker, Kubernetes, Github Actions and more!",
  photo:
    'https://coding-with-callie.s3.amazonaws.com/Screen+Shot+2024-04-16+at+7.15.04+PM.png',
  details: [
    "When I'm learning a new skill, I like to learn through practical examples. I try to find the simplest task that I can do with that new skill first. Once I feel confident that I can handle a super simple task, I make the task just a little bit harder. Eventually, I get to the point where the skill doesn't feel as overwhelming and I'm confident that I can tackle similar tasks at work.",
    "So, that's how we're going to structure this workshop. Instead of diving headfirst into deploying a fullstack application, we're going to deploy an nginx image from Docker. Then, we'll deploy a simple CRUD API. We'll add more complexity by throwing a database into the mix next. Finally, we'll deploy a simple React application that uses the CRUD API.",
    'You should leave the workshop being able to talk knowledgably about DevOps and ready to tackle deploying your own fullstack applications.',
    "To make things even MORE fun, we're going to go through the workshop together as a cohort. Starting on May 23, 2024, I'll post a weekly task with corresponding solution videos and other useful resources to help you complete the task.",
    "You'll need to complete the deployment-related task, submitting a deliverable showing your work, and post to LinkedIn (tagging Coding with Callie) discussing it. You can talk about what you learned that week, what you struggled with, what resources helped you get unstuck, etc.",
    "Then, it's time to help your cohort-mates! Review at least 2 of their deliverables.",
    "If you fully complete the workshop (10 deliverables, 10+ LinkedIn posts, 2 peer reviews per task) by the workshop deadline (August 1, 2024), I'll send you a certificate of completion, post a recommendation for you on your LinkedIn, and give you an opportunity to make money working on the Coding with Callie website.",
    "Yes, you read that right! If you are able to complete this workshop, I'll add you to the Coding with Callie codebase and provide you with a list of features/bugs/refactoring/etc. that I need help with. I'll pay a predetermined amount for each 'job' based on how in-depth it is. If you deliver me a PR of a working solution, I'll merge your code into the Coding with Callie codebase and pay you for your work!",
    "I'm going to fund these 'jobs' with 70% of the registration fees from this workshop. I'll use the remaining 30% to cover my expenses.",
  ],
  objectives: [
    'Deploy an nginx image to an AWS EKS cluster',
    "Deploy a simple CRUD API to an AWS EKS cluster using AWS' Elastic Container Registry",
    'Deploy a database to an AWS RDS instance',
    'Deploy a simple React application to an AWS EKS cluster using an nginx server',
    "Add logs, readiness probes, and liveness probes to an application to monitor your application's health",
    'Add a CI/CD pipeline to your application to automate deployment',
  ],
  techStack: [
    'AWS',
    'Docker',
    'Kubernetes',
    'Github',
    'Helm',
    'PostgreSQL',
    'Nginx',
    'React',
    'NestJS',
    'NodeJS',
    'TypeScript',
  ],
  price: 250,
  available: true,
  stripeId: 'price_1P6LuVGPYyWkM7JWsSEqZh97',
  sessions: [],
};
