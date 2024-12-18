import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type ConfirmationDialogProps = {
  children: React.ReactNode;
  title: string;
  description: string;
  disabled: boolean;
  onConfirm: () => void;
};

export default function ConfirmationDialog({
  children,
  title,
  description,
  disabled,
  onConfirm,
}: ConfirmationDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>{title}</AlertDialogHeader>
        <AlertDialogDescription>{description}</AlertDialogDescription>
        <AlertDialogFooter id="title">
          <AlertDialogCancel>cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={disabled}
            onClick={() => {
              onConfirm();
            }}
          >
            continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
