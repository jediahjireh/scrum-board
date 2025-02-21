"use client";

import React, { useState } from "react";

import { deleteTask, editTask } from "@/actions/board";
import { ColumnProps } from "@/types/types";
import { Draggable, Droppable } from "@hello-pangea/dnd";

import Modal from "@/components/scrum-board/Modal";

export default function Column({ title, tasks, droppableId }: ColumnProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const openDeleteModal = (taskId: string) => {
    setIsDelete(true);
    setTaskId(taskId);
  };

  const closeDeleteModal = () => {
    setIsDelete(false);
    setTaskId(null);
  };

  const openEditModal = (taskId: string) => {
    setIsEdit(true);
    setTaskId(taskId);
  };

  const closeEditModal = () => {
    setIsEdit(false);
    setTaskId(null);
  };

  return (
    <div className="h-full flex-1">
      {/*
      <div className="flex gap-1">
        <h2 className="mb-4 text-sm font-semibold uppercase">{title}</h2>
        <LuDot />
      </div>
      */}

      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="h-full rounded-lg border border-muted-foreground p-4"
          >
            {/* column heading */}
            <h2 className="mb-8 mt-2 text-center text-sm font-semibold uppercase tracking-wide">
              {title}
            </h2>

            {/* loop through tasks by categorisation */}
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    className="mb-2 flex justify-between rounded border border-muted-foreground bg-accent-foreground p-2"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(null)}
                  >
                    {task.name}
                    {hoverIndex === index && (
                      <div className="flex gap-2.5">
                        <span
                          className="mt-1 cursor-pointer text-xs text-accent/85"
                          onClick={() => openEditModal(task.id)}
                        >
                          Edit
                        </span>
                        <span
                          className="mt-1 cursor-pointer text-xs text-accent/60"
                          onClick={() => openDeleteModal(task.id)}
                        >
                          Delete
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {isEdit && (
        <Modal
          closeModal={closeEditModal}
          isEdit={isEdit}
          value={taskId!}
          action={editTask}
          title="Edit Task"
        />
      )}

      {isDelete && (
        <Modal
          closeModal={closeDeleteModal}
          title="Are you sure you want to delete this task?"
          value={taskId!}
          action={deleteTask}
          isDelete={isDelete}
        />
      )}
    </div>
  );
}
