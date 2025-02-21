import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { ModalProps } from "../props/modal";
import { DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";

const Modal = ({ open, setOpen, children, primaryBtnFn, btnColor, title, btnName }: ModalProps) => {
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-400/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-600 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <DialogHeader>
              <Button
                onClick={setOpen}
                className="btn btn-sm btn-circle btn-ghost absolute right-2"
              >
                ✕
              </Button>
            </DialogHeader>
            <div className="bg-white dark:bg-gray-700 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <DialogTitle className="text-center font-semibold text-black dark:text-white">
                {title}
              </DialogTitle>
              <DialogBody className="text-gray-900 dark:text-gray-200">
                {children}
              </DialogBody>
            </div>
            <DialogFooter className="bg-gray-50 dark:bg-gray-600 px-4 py-3 sm:flex sm:flex-row sm:px-6">
              <Button
                type="button"
                onClick={primaryBtnFn}
                className={"inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-xs sm:mr-3 sm:w-auto " + `bg-${btnColor}-600 hover:bg-${btnColor}-500`}
              >
                {btnName}
              </Button>
              <Button
                type="button"
                data-autofocus
                onClick={setOpen}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </Button>
            </DialogFooter>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
