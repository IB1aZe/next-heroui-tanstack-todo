import { useState, useEffect } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ModalFooter,
  ModalBody,
  Modal,
  ModalContent,
  ModalHeader,
} from "@heroui/react";

import { updateTodo } from "@/api/query";
import { TodoType } from "@/types";

export default function ModalEditBtn({
  id,
  isOpen,
  title,

  onEdit,
  onOpenChange,
}: {
  id: number;
  isOpen: boolean;
  title: string;
  onEdit: (id: number, title: string) => void;
  onOpenChange: (isOpen: boolean) => void;
}) {
  const [newTitle, setNewTitle] = useState(title);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isOpen) {
      setNewTitle(title); // Reset input when modal opens
    }
  }, [isOpen, title]);

  const mutation = useMutation({
    mutationFn: () => updateTodo(id, newTitle),
    onSuccess: (updatedTodo) => {
      queryClient.setQueryData<TodoType[]>(["loadTodos"], (old = []) =>
        old.map((todo) =>
          todo.id === id ? { ...todo, ...updatedTodo } : todo,
        ),
      );
      onEdit(id, updatedTodo.title);
      onOpenChange(false);
    },
  });

  return (
    <Modal
      isDismissable
      isKeyboardDismissDisabled={false}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Edit Todo</ModalHeader>
            <ModalBody>
              <Input
                placeholder="Edit title"
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="primary"
                isDisabled={mutation.isPending || newTitle.trim() === ""}
                onPress={() => mutation.mutate()}
              >
                {mutation.isPending ? "Saving..." : "Save"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
