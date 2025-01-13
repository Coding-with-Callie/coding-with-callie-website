import { Box } from "@chakra-ui/react";
import { PageType, TextWithImageAndLinkType } from "../../Pages/Page";
import TextWithImage from "./TextWithImage";
import TextWithImageForm from "./TextWithImageForm";

type Props = {
  data: TextWithImageAndLinkType;
  setPage: React.Dispatch<React.SetStateAction<PageType>>;
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
};

const EditableTextWithImage = ({ data, setPage, edit, setEdit, id }: Props) => {
  return (
    <Box w="100%">
      {edit ? (
        <TextWithImageForm
          id={id}
          initialState={data}
          setPage={setPage}
          setEdit={setEdit}
        />
      ) : (
        <TextWithImage data={data} />
      )}
    </Box>
  );
};

export default EditableTextWithImage;
