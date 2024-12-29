import { useState } from "react";
import { GuestSpeakerData, Speaker } from "../../Pages/GuestSpeakers";
import CustomForm from "../Forms/CustomForm";
import { guestSpeakerFormData } from "../../helpers/forms";

type Props = {
  setPastSpeakers: React.Dispatch<React.SetStateAction<Speaker[]>>;
  setUpcomingSpeakers: React.Dispatch<React.SetStateAction<Speaker[]>>;
};

const GuestSpeakerForm = ({ setPastSpeakers, setUpcomingSpeakers }: Props) => {
  const initialState = {
    name: "",
    date: "",
    sessionText: "",
    bioText: "",
    websiteUrl: "",
    sessionRecordingUrl: "",
    image: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [fileInputKey, setFileInputKey] = useState("");

  const updateData = (data: GuestSpeakerData) => {
    setPastSpeakers(data.pastSpeakers);
    setUpcomingSpeakers(data.upcomingSpeakers);
  };

  return (
    <CustomForm
      form={guestSpeakerFormData}
      initialState={initialState}
      data={formData}
      setData={setFormData}
      axiosType={"admin"}
      route={"/speaker"}
      message={"Guest speaker successfully added!"}
      setFileInputKey={setFileInputKey}
      fileInputKey={fileInputKey}
      updateData={updateData}
    />
  );
};

export default GuestSpeakerForm;
