import Paragraph from "./Paragraph";

type Props = {
  textBlocks: string[];
  textAlignCenter: boolean;
};

const BodyText = ({ textBlocks, textAlignCenter }: Props) => {
  return (
    <>
      {textBlocks.map((text: string) => {
        return <Paragraph textAlignCenter={textAlignCenter}>{text}</Paragraph>;
      })}
    </>
  );
};

export default BodyText;
