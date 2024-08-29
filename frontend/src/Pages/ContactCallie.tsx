import { FormControl } from "@chakra-ui/react";
import axios from "axios";
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
import { host } from "..";

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
      axios.post(`${host}/api/contact`, contactFormData);
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
    <Section screenSizeParameter={false} alignItemsCenter={false}>
      <BodyHeading textAlignCenter={true}>Contact Callie</BodyHeading>
      {formSent ? (
        <BodyText textBlocks={thankYouMessage} textAlignCenter={true} />
      ) : (
        <FormControl display="flex" flexDirection="column" gap={6}>
          <TextInput
            field="Name"
            onChange={onChangeName}
            value={contactFormData.name}
            isInvalid={submitClicked && invalidName}
          />
          <TextInput
            field="Email"
            onChange={onChangeEmail}
            value={contactFormData.email}
            isInvalid={submitClicked && invalidEmail}
            helperText="We'll never share your email."
          />
          <TextAreaInput
            field="Message"
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
