import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild
} from '@headlessui/react';
import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  title?: string;
  subtitle?: string;
  onClose: () => void;
  open: boolean;
}

const FullscreenDialog: React.FC<Props> = ({
  children,
  title,
  subtitle,
  onClose,
  open
}) => {
  return (
    <Transition show={open}>
      <Dialog onClose={onClose} className="relative z-50">
        <TransitionChild
          enter="transition-all ease-in-out duration-[500ms] delay-[200ms]"
          enterFrom="transform translate-y-full"
          enterTo="transform translate-y-0"
          leave="transition-all ease-in-out duration-[500ms]"
          leaveFrom="transform translate-y-0"
          leaveTo="transform translate-y-full"
        >
          <DialogPanel className="fixed h-full w-full top-0 space-y-4 bg-slate-100 overflow-y-scroll">
            <div className="flex">
              <div className="flex-grow" />
              <span onClick={onClose} className="btn-disabled sm:hidden">
                close
              </span>
            </div>
            <div className="p-6">
              <div className="flex items-center w-full cursor-pointer px-4 py-2 text-slate-700">
                <div>
                  {title && (
                    <DialogTitle as="h1" className="font-bold text-4xl">
                      {title}
                    </DialogTitle>
                  )}
                  {subtitle && (
                    <span className="text-slate-500 italic text-lg">
                      {subtitle}
                    </span>
                  )}
                </div>
                <div className="flex-grow"></div>
                <span
                  onClick={onClose}
                  className="btn-disabled hidden sm:block"
                >
                  close
                </span>
              </div>
              <Description as="div">{children}</Description>
            </div>
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
};

export default FullscreenDialog;
