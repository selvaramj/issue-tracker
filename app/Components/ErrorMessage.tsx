import React, { PropsWithChildren } from "react";
import { Text } from "@radix-ui/themes";

const ErrorMessage = (props: PropsWithChildren) => {
  if (!props.children) return null;
  return (
    <Text color="red" as="p">
      {props.children}
    </Text>
  );
};

export default ErrorMessage;
