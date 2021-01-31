import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";

export interface TextInputProps {
  label: string;
  id: string;
  value: string;
  defaultValue: string;
  onChange: (value: string) => void;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    // eslint-disable-next-line react/prop-types
    const { id, label, value, onChange } = props;
    return (
      <FormControl>
        <FormLabel htmlFor={id}>{label}</FormLabel>
        <Input
          ref={ref}
          id={id}
          value={value}
          onChange={event => onChange(event.target.value)}
        />
      </FormControl>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
