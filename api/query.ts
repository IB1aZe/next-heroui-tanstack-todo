import { TodoType } from "@/types";

export function loadDataQueryOptions() {
  return {
    queryKey: ["loadTodos"],
    queryFn: loadTodo,
  };
}

export function deleteDataQueryOptions() {
  return {
    queryKey: ["deleteTodod"],
    queryFn: deleteTodo,
  };
}

export function updateDataQueryOptions() {
  return {
    queryKey: ["updateTodo"],
    queryFn: updateTodo,
  };
}

export function createDataQueryOptions() {
  return {
    queryKey: ["createTodo"],
    queryFn: createTodo,
  };
}

export const loadTodo = async (): Promise<TodoType[]> => {
  //await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=10",
  );

  return response.json();
};

export const deleteTodo = async (id: number): Promise<void> => {
  await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: "DELETE",
  });
};

export const updateTodo = async (
  id: number,
  title: string,
): Promise<{ id: number; title: string; completed: boolean }> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify({ title }),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return response.json();
};

export const createTodo = async (todo: TodoType): Promise<TodoType> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    body: JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });

  return response.json();
};
