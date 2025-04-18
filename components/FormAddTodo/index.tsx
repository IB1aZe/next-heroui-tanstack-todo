import { useState } from "react";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createTodo } from "@/api/query";
import { TodoType } from "@/types";

export default function FormAddTodo() {
  const queryClient = useQueryClient();
  const [input, setInput] = useState("");
  const errors: string[] = [];

  const mutation = useMutation({
    mutationFn: (newTodo: TodoType) => createTodo(newTodo),
    onSuccess: (newTodo) => {
      queryClient.setQueryData<TodoType[]>(
        ["loadTodos"],
        (oldTodos: TodoType[] = []) => {
          return [...oldTodos, newTodo];
        },
      );
      queryClient.invalidateQueries({ queryKey: ["createTodo"] });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate({
      title: input,
      completed: false,
      userId: 1,
      id: Date.now(),
    });

    setInput(""); // Clear the input field after submission
  };

  return (
    <Form className="items-center" onSubmit={handleSubmit}>
      <Input
        errorMessage={() => <ul>{errors.toString()}</ul>}
        isInvalid={errors.length > 0}
        placeholder="Enter Todo"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button className="w-full" color="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
