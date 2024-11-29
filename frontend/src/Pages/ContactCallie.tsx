import { FormControl } from "@chakra-ui/react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Context } from "../App";
import BodyHeading from "../Components/BodyHeading";
import BodyText from "../Components/BodyText";
import TextAreaInput from "../Components/Forms/TextAreaInput";
import TextInput from "../Components/Forms/TextInput";
import MyButton from "../Components/MyButton";
import Section from "../Components/Section";
import {
  isInvalidEmail,
  isInvalidMessage,
  isInvalidName,
} from "../helpers/helpers";
import { axiosPublic } from "../helpers/axios_instances";

const thankYouMessage = ["Thank you! Callie will get back to you soon!"];

const ContactCallie = () => {
  const context: Context = useOutletContext();
  const [contactFormData, setContactFormData] = useState<any>({
    name: context.user?.name || "",
    email: context.user?.email || "",
    message: "",
  });
  const [submitClicked, setSubmitClicked] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [invalidName, setInvalidName] = useState(
    isInvalidName(contactFormData.name)
  );
  const [invalidEmail, setInvalidEmail] = useState(
    isInvalidEmail(contactFormData.email)
  );
  const [invalidMessage, setInvalidMessage] = useState(
    isInvalidMessage(contactFormData.message)
  );

  const onSubmit = () => {
    setInvalidName(isInvalidName(contactFormData.name));
    setInvalidEmail(isInvalidEmail(contactFormData.email));
    setInvalidMessage(isInvalidMessage(contactFormData.message));

    if (
      isInvalidName(contactFormData.name) ||
      isInvalidEmail(contactFormData.email) ||
      isInvalidMessage(contactFormData.message)
    ) {
      setSubmitClicked(true);
    } else {
      setFormSent(true);
      axiosPublic.post("/contact", contactFormData);
    }
  };

  const onChangeName = (e: any) => {
    setInvalidName(false);
    setContactFormData({ ...contactFormData, name: e.target.value });
  };

  const onChangeEmail = (e: any) => {
    setInvalidEmail(false);
    setContactFormData({ ...contactFormData, email: e.target.value });
  };

  const onChangeMessage = (e: any) => {
    setInvalidMessage(false);
    setContactFormData({ ...contactFormData, message: e.target.value });
  };

  return (
    <Section>
      <BodyHeading textAlign="center">Contact Callie</BodyHeading>
      {formSent ? (
        <BodyText textBlocks={thankYouMessage} textAlign="center" />
      ) : (
        <FormControl display="flex" flexDirection="column" gap={6}>
          <TextInput
            label="Name"
            field="name"
            onChange={onChangeName}
            value={contactFormData.name}
            isInvalid={submitClicked && invalidName}
          />
          <TextInput
            label="Email"
            field="email"
            onChange={onChangeEmail}
            value={contactFormData.email}
            isInvalid={submitClicked && invalidEmail}
          />
          <TextAreaInput
            label="Message"
            onChange={onChangeMessage}
            value={contactFormData.message}
            isInvalid={submitClicked && invalidMessage}
          />
          <MyButton onClick={onSubmit}>Submit</MyButton>
        </FormControl>
      )}
    </Section>
  );
};

export default ContactCallie;
