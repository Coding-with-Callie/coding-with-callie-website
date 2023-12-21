import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import BodyHeading from "../Components/BodyHeading";
import BodyText from "../Components/BodyText";
import MyButton from "../Components/MyButton";
import Section from "../Components/Section";

const thankYouMessage = ["Thank you! Callie will get back to you soon!"];

const ContactCallie = () => {
  const [contactFormData, setContactFormData] = useState<any>({});
  const [submitClicked, setSubmitClicked] = useState(false);
  const [formSent, setFormSent] = useState(false);

  const onSubmit = () => {
    if (
      contactFormData.name &&
      contactFormData.name !== "" &&
      contactFormData.email &&
      contactFormData.email !== "" &&
      contactFormData.message &&
      contactFormData.message !== ""
    ) {
      setFormSent(true);
      axios
        .post(
          `${process.env.REACT_APP_API || "http://localhost:3001"}/contact`,
          contactFormData
        )
        .then((response) => {
          console.log(response.data);
        });
    } else {
      setSubmitClicked(true);
    }
  };

  const onChangeName = (e: any) => {
    setSubmitClicked(false);
    setContactFormData({ ...contactFormData, name: e.target.value });
  };

  const onChangeEmail = (e: any) => {
    setSubmitClicked(false);
    setContactFormData({ ...contactFormData, email: e.target.value });
  };

  const onChangeMessage = (e: any) => {
    setSubmitClicked(false);
    setContactFormData({ ...contactFormData, message: e.target.value });
  };

  return (
    <Section screenSizeParameter={false} alignItemsCenter={false}>
      <BodyHeading textAlignCenter={true}>Contact Callie</BodyHeading>
      {formSent ? (
        <BodyText textBlocks={thankYouMessage} textAlignCenter={true} />
      ) : (
        <FormControl display="flex" flexDirection="column" gap={6}>
          <Box>
            <FormLabel layerStyle="input">Name</FormLabel>
            <Input
              type="text"
              layerStyle="input"
              variant="filled"
              id="name"
              onChange={onChangeName}
              isInvalid={
                submitClicked &&
                (!contactFormData.name || contactFormData.name === "")
              }
            />
          </Box>
          <Box>
            <FormLabel layerStyle="input">Email address</FormLabel>
            <Input
              type="email"
              layerStyle="input"
              variant="filled"
              onChange={onChangeEmail}
              isInvalid={
                submitClicked &&
                (!contactFormData.email || contactFormData.email === "")
              }
            />
            <FormHelperText>We'll never share your email.</FormHelperText>
          </Box>
          <Box>
            <FormLabel layerStyle="input">Message</FormLabel>
            <Textarea
              layerStyle="input"
              variant="filled"
              onChange={onChangeMessage}
              isInvalid={
                submitClicked &&
                (!contactFormData.message || contactFormData.message === "")
              }
            />
          </Box>
          <MyButton onClick={onSubmit}>Submit</MyButton>
        </FormControl>
      )}
    </Section>
  );
};

export default ContactCallie;
