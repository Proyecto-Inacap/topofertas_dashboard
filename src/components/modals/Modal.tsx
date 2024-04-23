import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  buttonLabel?: string;
  onConfirm?: () => void;
  isDisabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  title,
  description,
  children,
  isOpen,
  setIsOpen,
  buttonLabel,
  onConfirm,
  isDisabled,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          {onConfirm && (
            <Button
              disabled={isDisabled}
              onClick={() => {
                onConfirm();
              }}
            >
              {buttonLabel}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
