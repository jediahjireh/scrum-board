import React from "react";

import { db } from "@/prisma/db";
import { auth } from "@clerk/nextjs/server";

import Board from "@/components/scrum-board/Board";

export default async function page() {
  // call auth inside the server component
  const { userId } = await auth();

  if (!userId) {
    return <div>Please sign in to view your board.</div>;
  }

  const board = await db.scrumBoard.findFirst({
    where: {
      userId: userId!,
    },
    include: {
      tasks: true,
    },
  });
  return (
    <>
      <Board board={board} />
    </>
  );
}
