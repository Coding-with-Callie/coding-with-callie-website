import { useState } from "react";
import { PageType } from "../Pages/Page";
import EditableTextWithImageAndLink from "./Home/EditableTextWithImageAndLink";
import PhotoAndText from "./Home/PhotoAndText";
import ContentHeader from "./Home/ContentHeader";

type Props = {
  type: string;
  data: any;
  id: number;
  numSections: number;
  setPage: React.Dispatch<React.SetStateAction<PageType>>;
};

const Content = ({ data, id, numSections, setPage }: Props) => {
  const [edit, setEdit] = useState(false);

  const getContent = () => {
    if (data.bodyText && data.imageUrl && data.linkUrl) {
      return (
        <EditableTextWithImageAndLink
          data={data}
          setPage={setPage}
          edit={edit}
          setEdit={setEdit}
          id={id}
        />
      );
    } else if (data.imageUrl && data.bodyText) {
      return (
        <PhotoAndText
          heading={data.heading}
          text={data.bodyText}
          image={data.imageUrl}
        />
      );
    }
  };

  return (
    <>
      <ContentHeader
        id={id}
        order={0}
        numSections={numSections}
        edit={edit}
        setEdit={setEdit}
        setPage={setPage}
      />
      {getContent()}
    </>
  );
};

export default Content;
