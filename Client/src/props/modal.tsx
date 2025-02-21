import { Dispatch, SetStateAction } from "react";

export type ModalProps = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    children: React.ReactNode;
    primaryBtnFn: () => void;
    btnColor: "green" | "red" | "blue";
    title: string;
    btnName: string;
}