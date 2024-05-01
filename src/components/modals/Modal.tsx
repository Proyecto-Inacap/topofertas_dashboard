
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
  className?: string;
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
  className
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          {onConfirm && (
            <Button
              onClick={onConfirm}
              disabled={isDisabled}
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
