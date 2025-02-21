import { Dispatch, SetStateAction } from "react";

export type SelectProps = {
  options: Option[];
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

export type Option = {
  name: string;
  value: string;
};
