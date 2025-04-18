import { HeroUIProvider } from "@heroui/system";

import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <HeroUIProvider>
      <h1 className="text-3xl font-bold text-center mb-4">Todo List</h1>
      <TodoList />
    </HeroUIProvider>
  );
}
