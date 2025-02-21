"use client";

import React from "react";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { createTask } from "@/actions/board";
import { BoardProps, Task } from "@/types/types";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { PacmanLoader } from "react-spinners";

import Column from "@/components/scrum-board/Column";
import Modal from "@/components/scrum-board/Modal";
import { Button } from "@/components/ui/button";

export default function Board({ board }: { board: BoardProps | null }) {
  const [tasks, setTask] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [isCreate, setIsCreate] = useState(false);

  useEffect(() => {
    if (board) {
      setTask(board.tasks);
      setLoading(false);
    } else {
      router.push("/onboarding");
    }
  }, [board, router]);

  // modal controls
  const openModal = () => {
    setIsCreate(true);
  };

  const closeModal = () => {
    setIsCreate(false);
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const draggedTask = tasks.find((task) => task.id === draggableId);

    let updatedStatus: string;

    switch (destination.droppableId) {
      case "todo":
        updatedStatus = "TODO";
        break;
      case "inProgress":
        updatedStatus = "IN_PROGRESS";
        break;
      case "completed":
        updatedStatus = "DONE";
        break;
      default:
        updatedStatus = draggedTask!.status;
    }

    try {
      axios.post("/api/status", {
        taskId: draggableId,
        newStatus: updatedStatus,
      });
    } catch (error) {
      console.log(error);
    }

    const updatedTask = tasks.map((task) => {
      if (task.id === draggableId) {
        return {
          ...task,
          status: updatedStatus,
        };
      }
      return task;
    });

    setTask(updatedTask);
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <PacmanLoader color="#fff7" />
      </div>
    );
  }

  return (
    <div className="relative h-screen py-10">
      <h1 className="mb-10 text-center text-3xl font-bold">{board!.name}</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="mx-auto grid h-full w-[90%] max-w-[1500px] grid-rows-[1fr] gap-10 max-md:items-center md:grid-cols-3 md:gap-5">
          <Button
            className="fixed bottom-6 right-6 z-40 p-2.5 font-bold"
            onClick={openModal}
          >
            <FaPlus />
          </Button>

          {/* create new task modal */}
          {isCreate && (
            <Modal
              closeModal={closeModal}
              title="Create New Task"
              isCreate={isCreate}
              action={createTask}
              value={board!.id}
            />
          )}

          <Column
            title="Todo"
            tasks={tasks.filter((task) => task.status === "TODO")}
            droppableId="todo"
          />
          <Column
            title="In Progress"
            tasks={tasks.filter((task) => task.status === "IN_PROGRESS")}
            droppableId="inProgress"
          />
          <Column
            title="Completed"
            tasks={tasks.filter((task) => task.status === "DONE")}
            droppableId="completed"
          />
        </div>
      </DragDropContext>
    </div>
  );
}
