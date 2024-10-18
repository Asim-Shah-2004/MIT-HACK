import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null; 

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>  {/* Title of the modal */}
        </DialogHeader>
        <div>
          {children}  {/* The content passed as children, such as form fields */}
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline" className="mr-4">Cancel</Button>  {/* Close button */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
