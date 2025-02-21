"use client";

import React from "react";

import Link from "next/link";

import useRouteCheck from "@/hooks/useRouteCheck";
import { SignedIn, SignedOut, UserButton, useSession } from "@clerk/nextjs";
import { PiKanbanDuotone } from "react-icons/pi";

export default function Navbar() {
  const { isSignedIn } = useSession();
  const onboardingRoute = useRouteCheck(["onboarding"]);
  const scrumBoardRoute = useRouteCheck(["scrum-board"]);

  return (
    <div className="relative z-10 w-full py-5 backdrop-blur-md">
      <div className="max-w-[1450 mx-auto flex w-[90%] place-items-center justify-between">
        <Link href={"/"} className="flex items-center gap-1 text-2xl font-bold">
          <span>
            <PiKanbanDuotone />
          </span>
          Scrum Board
        </Link>

        <SignedOut>
          <Link href={"/sign-in"} className="tracking-tight hover:underline">
            Already a scrum master? Login
          </Link>
        </SignedOut>
        <SignedIn>
          <div className="flex place-items-center gap-2">
            <UserButton afterSwitchSessionUrl="/" />
            {!scrumBoardRoute && isSignedIn && !onboardingRoute && (
              <Link href={"/scrum-board"}>
                <span className="tracking-tight hover:underline hover:underline-offset-8">
                  Go to my board
                </span>{" "}
                &#8594;
              </Link>
            )}
          </div>
        </SignedIn>
      </div>
    </div>
  );
}
