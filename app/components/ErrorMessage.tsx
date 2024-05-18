import React, { PropsWithChildren } from "react";
import { Text } from "@radix-ui/themes";

interface Props {
  alignCenter?: boolean;
  children: React.ReactNode;
}

const ErrorMessage = (props: Props) => {
  if (!props.children) return null;
  return (
    <Text color="red" as="p" align={props.alignCenter ? "center" : "left"}>
      {props.children}
    </Text>
  );
};

export default ErrorMessage;
