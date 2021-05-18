import {
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputFieldProps,
  NumberInputProps,
  NumberInputStepper
} from "@chakra-ui/react";
import React from "react";

export interface StepperInputProps extends NumberInputProps {
  label: string;
  inputProps: NumberInputFieldProps;
}

export default function StepperInput(props: StepperInputProps): JSX.Element {
  const { id, label, inputProps, ...rest } = props;

  return (
    <FormControl>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <NumberInput {...rest}>
        <NumberInputField {...inputProps} />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  );
}
