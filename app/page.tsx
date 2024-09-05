"use client";
import { useToast } from "@/context/ToastContext";
import { Button } from "@nextui-org/react";

export default function Home() {
  const { addToast } = useToast();
  return (
    <main>
      <div>
        <Button
          variant="shadow"
          color="primary"
          onClick={() =>
            addToast({
              type: "info",
              message: "سلام دوست عزیز امیدوارم حالت خوب باشه.",
              duration: 15000,
            })
          }
        >
          توست
        </Button>
        <Button
          variant="shadow"
          color="primary"
          onClick={() =>
            addToast({
              type: "error",
              message: "سلام دوست عزیز امیدوارم حالت خوب باشه.",
              duration: 15000,
            })
          }
        >
          توست
        </Button>
        <Button
          variant="shadow"
          color="primary"
          onClick={() =>
            addToast({
              type: "success",
              message: "سلام دوست عزیز امیدوارم حالت خوب باشه.",
              duration: 15000,
            })
          }
        >
          توست
        </Button>
        <Button
          variant="shadow"
          color="primary"
          onClick={() =>
            addToast({
              type: "warning",
              message: "سلام دوست عزیز امیدوارم حالت خوب باشه.",
              duration: 15000,
            })
          }
        >
          توست
        </Button>
      </div>
    </main>
  );
}
