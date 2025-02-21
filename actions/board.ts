"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/prisma/db";
import { auth } from "@clerk/nextjs/server";

export async function getBoardIdForUser() {
  const { userId }: { userId: string | null } = await auth();

  const board = await db.scrumBoard.findFirst({
    where: { userId: userId! },
  });

  return board ? board.id : null;
}

export async function createNewBoard(formData: FormData) {
  const { userId }: { userId: string | null } = await auth();
  const name = formData.get("boardName") as string;

  const existingBoard = await db.scrumBoard.findFirst({
    where: {
      userId: userId!,
    },
  });

  if (existingBoard) {
    await db.scrumBoard.update({
      where: {
        id: existingBoard.id,
      },
      data: {
        name: name,
      },
    });
  } else {
    await db.scrumBoard.create({
      data: {
        name: name,
        userId: userId!,
      },
    });
  }

  revalidatePath("/");
}

export async function createTask(formData: FormData) {
  const name = formData.get("task") as string;
  const boardId = formData.get("boardId") as string;

  console.log("Creating Task:", { name, boardId });

  if (!name.trim() || !boardId) {
    console.error("Missing task name or boardId");
    return;
  }

  await db.task.create({
    data: {
      name: name,
      board: { connect: { id: boardId } },
      status: "TODO",
    },
  });

  revalidatePath("/");
}

export async function editTask(formData: FormData) {
  const newTask = formData.get("newTask") as string;
  const taskId = formData.get("taskId") as string;

  if (!newTask.trim()) {
    return;
  }

  await db.task.update({
    where: {
      id: taskId,
    },
    data: {
      name: newTask,
    },
  });

  revalidatePath("/");
}

export async function deleteTask(formData: FormData) {
  const taskId = formData.get("taskId") as string;

  await db.task.delete({
    where: {
      id: taskId,
    },
  });

  revalidatePath("/");
}
