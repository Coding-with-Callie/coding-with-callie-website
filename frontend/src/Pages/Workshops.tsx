import { useLoaderData } from "react-router-dom";
import Section from "../Components/Section";
import BodyText from "../Components/BodyText";
import BodyHeading from "../Components/BodyHeading";
import WorkshopTiles from "../Components/Workshops/WorkshopTiles";
import WorkshopTilesContainer from "../Components/Workshops/WorkshopTilesContainer";

export const why = [
  "When I was learning to code, I spent a maximum of a week or two working on a single project. I made all the quick portfolio projects: weather app, movie list, online clothing store, etc.",
  "When I started my software engineering position, however, I realized how much my projects were lacking when it comes to: error handling, testing, logging, security, project management, documentation, etc. So, I decided to start recording myself building fullstack applications from planning to deployment, spending the necessary time to make sure users could actually use them.",
];

export const mantra = [
  "You'll see me put this mantra into practice while completing my workshops. A lot of engineers get stuck trying to architect elegant code or make a feature absolutely perfect before making their pull request and it ends up being a detriment to the project. On the flip side, a lot of bootcamps move so quickly, students end up coming up with 80% of a solution they don't have the time to fully understand before moving on and never touching the code again. In my workshops, I try to find the right balance.",
  "My general rule of thumb is to go with the easiest solution to code first. I don't worry about issues until they start being issues. As soon as my code in one area starts to be a problem for another area, I refactor. I find that this workflow helps me understand in practice a lot of the concepts we're taught in school/bootcamps.",
];

export const difference = [
  "When I'm learning something new, it's hard for me to understand how the author of an article or developer in a video came up with their code. I find myself thinking that I understand, but then not being able to implement a similar solution without copying and pasting. At work, I've noticed that pair programming works a little differently. Your mentor doesn't spend hours crafting the perfect code for the ticket you're working on and then write out scripts to explain it. No, they hop on a call with you and think aloud.",
  "I wondered if it would help to watch a developer as they think through, plan out, and hack together a project. My goal isn't to teach you how to write perfect code on the first try. Instead, it is to teach you how to quickly develop usable MVPs, problem solve when you hit a roadblock, and learn a new tech stack in a practical setting.",
  "That's why I record myself developing the entire project from planning to testing and through deployment. While I may research a new library or framework prior to pressing record or pause recording if it's going to take me too long to Google my way out of a jam, you'll see me debug, think through different game plans, hack an initial solution together, make mistakes, and refactor my code.",
];

export type Workshop = {
  id: number;
  name: string;
  description: string;
  photo: string;
  details: string[];
  objectives: string[];
  techStack: string[];
  price: number;
};

const Workshops = () => {
  const workshops = useLoaderData() as Workshop[];

  return (
    <>
      <Section>
        <BodyHeading>My Workshop Origin Story</BodyHeading>
        <BodyText textBlocks={why} />
      </Section>
      <Section>
        <BodyHeading> Make it work first, and then make it better</BodyHeading>
        <BodyText textBlocks={mantra} />
      </Section>
      <Section>
        <BodyHeading>What sets Coding with Callie workshops apart?</BodyHeading>
        <BodyText textBlocks={difference} />
      </Section>
      <WorkshopTilesContainer>
        <WorkshopTiles workshops={workshops} />
      </WorkshopTilesContainer>
    </>
  );
};

export default Workshops;
