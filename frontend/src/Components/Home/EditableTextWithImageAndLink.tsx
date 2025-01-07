import { Box } from "@chakra-ui/react";
import { TextWithImageAndLinkType } from "../../Pages/Page";
import TextWithImageAndLinkForm from "./TextWithImageAndLinkForm";
import TextWithImageAndLink from "./TextWithImageAndLink";

type Props = {
  data: TextWithImageAndLinkType;
  setPageData: React.Dispatch<React.SetStateAction<any[]>>;
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
};

const EditableTextWithImageAndLink = ({
  data,
  setPageData,
  edit,
  setEdit,
  id,
}: Props) => {
  return (
    <Box>
      {edit ? (
        <TextWithImageAndLinkForm
          id={id}
          initialState={data}
          setPageData={setPageData}
          setEdit={setEdit}
        />
      ) : (
        <TextWithImageAndLink data={data} />
      )}
    </Box>
  );
};

export default EditableTextWithImageAndLink;
