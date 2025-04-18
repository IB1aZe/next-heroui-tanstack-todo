import { useState } from "react";
import { Button } from "@heroui/button";

import ModalEditBtn from "../ModalEditBtn";

import { EditIcons } from "@/Icons";

export default function EditBtn({
  id,
  title,

  onEdit,
}: {
  id: number;
  title: string;
  completed: boolean;
  onEdit: (id: number, title: string) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsModalOpen(open);
  };

  return (
    <>
      <Button
        color="primary"
        type="button"
        variant="light"
        onPress={() => setIsModalOpen(true)}
      >
        <EditIcons />
      </Button>

      <ModalEditBtn
        id={id}
        isOpen={isModalOpen}
        title={title}
        onEdit={onEdit}
        onOpenChange={handleOpenChange}
      />
    </>
  );
}
