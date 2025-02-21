import { NextRequest, NextResponse } from "next/server";

import { db } from "@/prisma/db";

// update task status
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { taskId, newStatus } = body;

  const updatedTask = await db.task.update({
    where: { id: taskId },
    data: { status: newStatus },
  });

  return NextResponse.json({ updatedTask });
}
