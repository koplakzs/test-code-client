import { forwardRef } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface DeleteModalProps {
  isOpen: boolean;
  handleModal: () => void;
  handleDelete: () => void;
}

const DeclineReportModal = forwardRef<HTMLTextAreaElement, DeleteModalProps>(
  ({ handleDelete, handleModal, isOpen }, ref) => {
    return (
      <Dialog open={isOpen} onOpenChange={handleModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Laporan</DialogTitle>
          </DialogHeader>
          <Label>Alasan</Label>
          <Textarea ref={ref} className="resize-none" />
          <DialogFooter>
            <Button variant={"destructive"} onClick={handleDelete}>
              Tolak
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
);

export default DeclineReportModal;
