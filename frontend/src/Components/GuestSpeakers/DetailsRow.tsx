import { Box, IconButton, Text, Input, Textarea } from "@chakra-ui/react";
import { EditIcon, CheckIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosPrivate } from "../../helpers/axios_instances";

type Props = {
  field: string;
  value: string | string[];
  variableName: any;
};

const UserDetailsRow = ({ field, value, variableName }: Props) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [updateField, setUpdateField] = useState(false);
  const [valueState, setValueState] = useState<any>(value);
  const [isChanged, setIsChanged] = useState(false);

  const showNotification = (message: string, type: "success" | "error") => {
    toast[type](message, { toastId: "success" });
  };

  const validURL = (str: string) => {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  };

  const onClickEdit = () => {
    setUpdateField(!updateField);
  };

  const onClickCheck = async () => {
    setUpdateField(!updateField);

    let formattedValue = valueState;
    if (field === "About" || field === "Session Description") {
      formattedValue = (valueState as string)
        .split("\n\n")
        .map((item: string) => item.trim());
    }

    if (field === "Date") {
      const [year, month, day] = valueState.split("-").map(Number);
      const dateValue = new Date(year, month - 1, day);
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      formattedValue = dateValue.toLocaleDateString("en-US", options);
    }

    if (
      (field === "Website" ||
        field === "Session Recording" ||
        field === "Photo") &&
      validURL(valueState) === false
    ) {
      showNotification("Please enter a valid url.", "error");
      return;
    }

    await axiosPrivate
      .put(`/guest-speaker/${id}`, {
        id,
        field: variableName,
        value: formattedValue,
      })
      .then(() => {
        setIsChanged(true);
        showNotification(`${field} successfully changed!`, "success");
      })
      .catch(() => {
        showNotification("Error", "error");
      });
  };

  const verifyInputField = (field: string) => {
    if (field === "Date") {
      return (
        <Input
          type="date"
          value={valueState}
          flex={1}
          h="32px"
          onChange={onChange}
        />
      );
    }

    if (field === "Session Description" || field === "About") {
      return (
        <Textarea flex={1} h="32px" value={valueState} onChange={onChange} />
      );
    }

    if (
      field === "Website" ||
      field === "Session Recording" ||
      field === "Photo"
    ) {
      return (
        <Input
          type="url"
          flex={1}
          h="32px"
          value={valueState}
          onChange={onChange}
        />
      );
    }

    return (
      <Input
        type="text"
        flex={1}
        h="32px"
        value={valueState}
        onChange={onChange}
      />
    );
  };

  const verifyTextField = (field: string) => {
    if (
      field === "Website" ||
      field === "Session Recording" ||
      field === "Photo"
    ) {
      const truncateString = (str: string, num: number) => {
        if (!str) {
          return "";
        }
        if (str.length <= num) {
          return str;
        }
        return str.slice(0, num) + "...";
      };
      return (
        <Text flex={1} h="32px" onChange={onChange}>
          {truncateString(valueState, 25)}
        </Text>
      );
    }

    if (field === "Session Description" || field === "About") {
      return (
        <Text flex={1} lineHeight="32px">
          {valueState}
        </Text>
      );
    }

    if (field === "Date" && valueState.length < 11) {
      const [year, month, day] = valueState.split("-").map(Number);
      const dateValue = new Date(year, month - 1, day);
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return (
        <Text flex={1} h="32px">
          {dateValue.toLocaleDateString("en-US", options)}
        </Text>
      );
    }

    return (
      <Text flex={1} lineHeight="32px">
        {valueState}
      </Text>
    );
  };

  const onChange = (e: any) => {
    setValueState(e.target.value);
  };

  useEffect(() => {
    if (isChanged) {
      navigate(`/guest-speaker/${id}`);
      setIsChanged(false);
    }
  }, [isChanged, navigate, id]);

  return (
    <Box display="flex" gap={2}>
      <Text flex={1} lineHeight="32px">
        {field}:
      </Text>
      {updateField ? verifyInputField(field) : verifyTextField(field)}
      <IconButton
        aria-label="Edit Name"
        icon={updateField ? <CheckIcon /> : <EditIcon />}
        onClick={updateField ? onClickCheck : onClickEdit}
      />
    </Box>
  );
};

export default UserDetailsRow;
