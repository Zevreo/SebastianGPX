import { Dispatch, SetStateAction } from "react";

export type SearchInputProps = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeholder: string | undefined;
};
