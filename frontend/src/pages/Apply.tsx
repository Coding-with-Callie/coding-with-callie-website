import BodyHeading from "../Components/BodyHeading";
import BodyText from "../Components/BodyText";
import MyButton from "../Components/MyButton";
import Section from "../Components/Section";

const comingSoon = [
  "I'm working on adding the Todo List Workshop application to this site, but it isn't quite ready yet! If you'd like to apply, click the button below. You will be redirected to a Google Form.",
  "Please note that I am choosing from the application pool based on effort and skill level. I'm hoping for a highly interactive and engaging workshop, so the more effort you put into the application, the better. In terms of skill level, I want to have a similar skill level across the cohort, but I don't have a specific skill level in mind. I'll choose based on the majority of applicants.",
];

const openApplication = () => {
  window.open("https://forms.gle/TyhCvTkdCmaWNnmU6", "_blank");
};

const Apply = () => {
  return (
    <Section screenSizeParameter={false} alignItemsCenter={false}>
      <BodyHeading textAlignCenter={true}>Apply</BodyHeading>
      <BodyText textBlocks={comingSoon} textAlignCenter={true} />
      <MyButton onClick={openApplication}>Apply</MyButton>
    </Section>
  );
};

export default Apply;
