import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@heroui/button";

import { DeleteIcons } from "@/Icons";
import { deleteTodo } from "@/api/query";
import { TodoType } from "@/types";

export default function DeleteBtn({
  id,
  onDelete,
}: {
  id: number;
  onDelete: (id: number) => void;
}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onSuccess: () => {
      queryClient.setQueryData<TodoType[]>(["loadTodos"], (oldTodos: any) => {
        return oldTodos.filter((todo: any) => todo.id !== id);
      });
      queryClient.invalidateQueries({ queryKey: ["createTodos"] });
      onDelete(id);
    },
  });

  return (
    <Button
      color="danger"
      type="button"
      variant="light"
      onPress={() => mutation.mutate(id)}
    >
      <DeleteIcons />
    </Button>
  );
}
