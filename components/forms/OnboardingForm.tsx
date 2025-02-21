"use client";

import React from "react";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { createNewBoard, createTask } from "@/actions/board";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { PacmanLoader } from "react-spinners";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function OnboardingForm({
  user,
  boardId,
}: {
  user: string | null | undefined;
  boardId: string | null;
}) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [boardName, setBoardName] = useState("");
  const [taskName, setTaskName] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (boardId !== null) {
      router.replace("/scrum-board");
    }
  }, []);

  const stepOneSubmit = () => {
    setStep(2);
  };

  const stepTwoSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      router.replace("/scrum-board");
      toast.success(`Welcome to your new board ${user}`);
      setLoading(false);
    }, 5000);
  };

  const goBack = () => {
    setStep(1);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.5 }}
      className="mx-auto flex h-full w-[90%] max-w-[1450px] flex-col items-center justify-center pt-[82px]"
    >
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full text-center"
        >
          <h1 className="mb-10 text-4xl font-bold uppercase">
            Hey {user}! Start off by giving your board a name.
          </h1>
          <form
            className="flex flex-col items-center gap-10"
            action={createNewBoard}
            onSubmit={stepOneSubmit}
          >
            <Input
              type="text"
              name="boardName"
              placeholder="My Board Name..."
              disabled={loading}
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
            />
            <Button type="submit">Continue</Button>
          </form>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full text-center"
        >
          <h1 className="mb-10 text-4xl font-bold uppercase">
            Add first task :&#41;
          </h1>
          <form
            onSubmit={stepTwoSubmit}
            action={createTask}
            className="flex flex-col items-center gap-10"
          >
            <Input
              type="text"
              name="task"
              placeholder="My First Task..."
              disabled={loading}
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            {/* hidden input holding board id to send to server action */}
            <Input type="hidden" value={boardId!} name="boardId" />

            <div className="mb-10 flex w-4/5 justify-between">
              <Button onClick={goBack} disabled={loading}>
                Go Back
              </Button>
              <Button type="submit" disabled={loading}>
                Continue
              </Button>
            </div>
            {loading ? (
              <div className="flex items-center gap-3">
                <PacmanLoader color="#fff7" />
                <span>Getting Your Board Ready</span>
              </div>
            ) : null}
          </form>
        </motion.div>
      )}
    </motion.div>
  );
}
