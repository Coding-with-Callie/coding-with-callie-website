import Paragraph from "./Paragraph";

type Props = {
  textBlocks: string[];
};

const BodyText = ({ textBlocks }: Props) => {
  return (
    <>
      {textBlocks.map((text: string) => {
        return <Paragraph text={text} />;
      })}
    </>
  );
};

export default BodyText;
