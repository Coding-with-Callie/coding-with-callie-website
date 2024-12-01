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
import CustomForm from "../Components/Forms/CustomForm";
import { contactCallieFormData } from "../helpers/forms";

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

const ContactCallie = () => {
  const { user }: Context = useOutletContext();

  const initialState = {
    name: user.name || "",
    email: user.email || "",
    message: "",
  };

  const [contactData, setContactData] = useState<ContactFormData>(initialState);

  return (
    <Section>
      <CustomForm
        form={contactCallieFormData}
        initialState={initialState}
        data={contactData}
        setData={setContactData}
        axiosType={"public"}
        route={"/contact"}
        message={"Thank you! Callie will get back to you soon!"}
      />
    </Section>
  );
};

export default ContactCallie;
