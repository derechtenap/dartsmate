import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

type Props = {
  children: React.ReactNode;
  state: boolean;
  title: string;
};

const Modal = ({ children, state, title }: Props) => {
  return (
    <Transition appear show={state} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => state}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full select-none items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="max-w-lg bg-base-300 p-8 text-left">
                <Dialog.Title as="h3" className="text-2xl font-medium">
                  {title}
                </Dialog.Title>
                <div className="mt-2 text-gray-400">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
