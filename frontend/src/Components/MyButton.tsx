import { Button, Spinner } from "@chakra-ui/react";
import React from "react";

type Props = {
  children: React.ReactNode;
  onClick?: any;
  width?: any;
  disabled?: boolean;
  loading?: boolean;
  variant?: "solid" | "outline" | "ghost" | "link";
};

const MyButton = ({
  children,
  onClick,
  width = "100%",
  disabled,
  loading = false,
  variant = "solid",
}: Props) => {
  return (
    <Button w={width} onClick={onClick} disabled={disabled} variant={variant}>
      {loading ? <Spinner /> : children}
    </Button>
  );
};

export default MyButton;
