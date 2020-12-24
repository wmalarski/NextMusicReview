import { FormControl, FormLabel, Input, InputProps } from "@chakra-ui/react";
import React from "react";

export interface TextInputProps {
  label: string;
  id: string;
  defaultValue: string;
  inputProps?: InputProps;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    // eslint-disable-next-line react/prop-types
    const { id, label, inputProps = {} } = props;
    return (
      <FormControl>
        <FormLabel htmlFor={id}>{label}</FormLabel>
        <Input ref={ref} id={id} {...inputProps} />
      </FormControl>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
