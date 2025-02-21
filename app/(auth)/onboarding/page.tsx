import React from "react";

import { getBoardIdForUser } from "@/actions/board";
import { currentUser } from "@clerk/nextjs/server";

import OnboardingForm from "@/components/forms/OnboardingForm";
import Aurora from "@/components/ui/aurora";

export default async function page() {
  const boardId = await getBoardIdForUser();
  const user = await currentUser();
  const userName = user?.firstName ?? "";

  return (
    <div>
      <Aurora colorStops={["#9c43fe", "#4cc2e9", "#101499"]} speed={0.5} />
      <OnboardingForm user={userName} boardId={boardId} />
    </div>
  );
}
