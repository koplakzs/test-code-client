import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface DeleteModalProps {
  isOpen: boolean;
  handleModal: () => void;
  handleDelete: () => void;
}

export default function DeleteModal({
  handleDelete,
  handleModal,
  isOpen,
}: DeleteModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={handleModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hapus Laporan</DialogTitle>
        </DialogHeader>
        <p>Apakah yakin ingin menghapus laporan ini ?</p>
        <DialogFooter>
          <Button variant={"destructive"} onClick={handleDelete}>
            Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
