export type ModalProps = {
    open: boolean;
    setOpen: () => void;
    children: React.ReactNode;
    primaryBtnFn: () => void;
    btnColor: "green" | "red" | "blue";
    title: string;
    btnName: string;
}