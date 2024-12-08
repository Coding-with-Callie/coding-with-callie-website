import BodyHeading from "../BodyHeading";

type Props = {
  children: string;
};

const FormHeading = ({ children }: Props) => {
  return (
    <BodyHeading textAlign="center" mb={0}>
      {children}
    </BodyHeading>
  );
};

export default FormHeading;
