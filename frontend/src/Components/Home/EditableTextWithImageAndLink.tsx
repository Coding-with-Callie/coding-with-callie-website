import { Box } from "@chakra-ui/react";
import { PageType, TextWithImageAndLinkType } from "../../Pages/Page";
import TextWithImageAndLinkForm from "./TextWithImageAndLinkForm";
import TextWithImageAndLink from "./TextWithImageAndLink";

type Props = {
  data: TextWithImageAndLinkType;
  setPage: React.Dispatch<React.SetStateAction<PageType>>;
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
};

const EditableTextWithImageAndLink = ({
  data,
  setPage,
  edit,
  setEdit,
  id,
}: Props) => {
  return (
    <Box w="100%">
      {edit ? (
        <TextWithImageAndLinkForm
          id={id}
          initialState={data}
          setPage={setPage}
          setEdit={setEdit}
        />
      ) : (
        <TextWithImageAndLink data={data} />
      )}
    </Box>
  );
};

export default EditableTextWithImageAndLink;
