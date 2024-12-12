import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Context } from "../App";
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
    <CustomForm
      form={contactCallieFormData}
      initialState={initialState}
      data={contactData}
      setData={setContactData}
      axiosType={"public"}
      route={"/contact"}
      message={"Thank you! Callie will get back to you soon!"}
    />
  );
};

export default ContactCallie;
