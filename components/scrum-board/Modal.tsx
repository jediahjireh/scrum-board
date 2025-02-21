import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Modal = ({
  closeModal,
  title,
  action,
  value,
  isCreate,
  isEdit,
  isDelete,
}: {
  isCreate?: boolean;
  isDelete?: boolean;
  isEdit?: boolean;
  value: string;
  action: (formData: FormData) => Promise<void>;
  title: string;
  closeModal: () => void;
}) => {
  const submitHandler = () => {
    if (isCreate) {
      toast.success("New Task Created");
    } else if (isEdit) {
      toast.success("Task Has Been Updated");
    } else if (isDelete) {
      toast.success("Tak has been deleted");
    }
    closeModal();
  };

  return (
    <div
      className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-neutral-800 bg-opacity-50"
      onClick={closeModal}
    >
      <div
        className="rounded-lg border bg-accent-foreground p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-xl font-bold">{title}</h2>
        <div className="flex justify-center">
          <form action={action} onSubmit={submitHandler}>
            <Input type="hidden" name="taskId" value={value} />
            {isEdit && (
              <Input type="text" name="newTask" placeholder="Update task..." />
            )}
            {isCreate && (
              <>
                <Input type="text" name="task" placeholder="New task..." />
                <Input type="hidden" value={value} name="boardId" />
              </>
            )}

            <div className="mt-5 flex gap-5">
              <Button onClick={closeModal}>Cancel</Button>
              <Button variant={"secondary"} type="submit">
                Confirm
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
