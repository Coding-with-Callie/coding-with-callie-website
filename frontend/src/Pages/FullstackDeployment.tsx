import { Link } from "react-router-dom";
import BodyHeading from "../Components/BodyHeading";
import BodyText from "../Components/BodyText";
import MyButton from "../Components/MyButton";
import Section from "../Components/Section";

const workshopDetails = ["I'm still planning this workshop out! Stay tuned..."];

const FullstackDeployment = () => {
  return (
    <>
      <Section screenSizeParameter={false} alignItemsCenter={false}>
        <BodyHeading textAlignCenter={true}>
          Fullstack Deployment Workshop Details
        </BodyHeading>
        <BodyText textBlocks={workshopDetails} textAlignCenter={true} />
      </Section>
      <Section screenSizeParameter={false} alignItemsCenter={false}>
        <Link to="/workshops">
          <MyButton>Return to Workshops</MyButton>
        </Link>
      </Section>
    </>
  );
};

export default FullstackDeployment;
