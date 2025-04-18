"use client";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@heroui/skeleton";
import {
  Selection,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";

import FormAddTodo from "../FormAddTodo";
import DeleteBtn from "../DeleteBtn/DeleteBtn";
import EditBtn from "../EditBtn/EditBtn";
import ModalEditBtn from "../ModalEditBtn";

import { loadDataQueryOptions } from "@/api/query";

export default function TodoList() {
  const { data = [], error, isPending } = useQuery(loadDataQueryOptions());

  const completedTodos = useMemo(
    () => data.filter((item) => item.completed),
    [data],
  );

  const allTodoIds = useMemo(() => data.map((item) => String(item.id)), [data]);

  const defaultSelectedKeys = useMemo(
    () => completedTodos.map((item) => String(item.id)),
    [completedTodos],
  );

  const [checkedIds, setCheckedIds] = useState<string[]>(defaultSelectedKeys);

  function handleDelete(id: number) {
    setCheckedIds((prev) => prev.filter((item) => item !== String(id)));
  }

  const handleEdit = (id: number, title: string) => {
    return (
      <ModalEditBtn
        id={id}
        isOpen={true}
        title={title}
        onEdit={() => {}}
        onOpenChange={() => {}}
      />
    );
  };

  const handleCheck = (keys: Selection) => {
    if (keys === "all") {
      setCheckedIds(allTodoIds);
    } else {
      const selectedKeys = Array.from(keys) as string[];

      setCheckedIds(selectedKeys);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isPending) {
    return (
      <div className="flex justify-center">
        <Skeleton className="w-full h-96" />
      </div>
    );
  }

  return (
    <div className="justify-end">
      <FormAddTodo />
      <Table
        aria-label="Example static collection table"
        color="primary"
        defaultSelectedKeys={defaultSelectedKeys}
        selectionMode="multiple"
        onSelectionChange={handleCheck}
      >
        <TableHeader>
          <TableColumn>Title</TableColumn>
          <TableColumn className="text-center">Action</TableColumn>
        </TableHeader>

        <TableBody className="justify-center items-center">
          {data?.map((todo, index) => (
            <TableRow key={todo?.id || index} className="pr-2">
              <TableCell>{todo?.title}</TableCell>
              <TableCell>
                <div className="flex gap-2 justify-center pl-4">
                  <EditBtn
                    completed={todo?.completed}
                    id={todo?.id}
                    title={todo?.title}
                    onEdit={() => handleEdit(todo?.id, todo?.title)}
                  />
                  <DeleteBtn
                    id={todo?.id}
                    onDelete={() => handleDelete(todo?.id)}
                  />
                </div>
              </TableCell>
            </TableRow>
          )) || (
            <TableRow>
              <TableCell colSpan={2}>No data available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
