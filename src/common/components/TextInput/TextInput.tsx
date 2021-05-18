import { FormControl, FormLabel, Input, InputProps } from "@chakra-ui/react";
import React from "react";

export interface TextInputProps extends InputProps {
  label: string;
  onTextChange?: (value: string) => void;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    // eslint-disable-next-line react/prop-types
    const { id, label, onTextChange, ...rest } = props;
    return (
      <FormControl>
        <FormLabel htmlFor={id}>{label}</FormLabel>
        <Input
          ref={ref}
          id={id}
          onChange={event => onTextChange?.(event.target.value)}
          {...rest}
        />
      </FormControl>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
