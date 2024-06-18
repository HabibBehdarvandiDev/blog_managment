"use client";

import { Button } from "@nextui-org/react";
import { useEffect } from "react";
import CancelCircleIcon from "./icons/CancelCircleIcon";
import CheckmarkCircleIcon from "./icons/CheckmarkCircleIcon";
import WarningCircleIcon from "./icons/WarningCircleIcon";
import InfoCircleIcon from "./icons/InfoCircleIcon";

interface ToastProps {
  id: number;
  message: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
  onRemove: (id: number) => void;
}

const toastTypeClasses = {
  success:
    "bg-white text-zinc-800 border-1.5 border-gray-300/15 shadow-zinc-800/10 shadow-xl rounded-xl flex items-center p-4",
  error:
    "bg-white text-zinc-800 border-1.5 border-gray-300/15 shadow-zinc-800/10 shadow-xl rounded-xl flex items-center p-4",
  warning:
    "bg-white text-zinc-800 border-1.5 border-gray-300/15 shadow-zinc-800/10 shadow-xl rounded-xl flex items-center p-4",
  info: "bg-white text-zinc-800 border-1.5 border-gray-300/15 shadow-zinc-800/10 shadow-xl rounded-xl flex items-center p-4",
};

const toastIcons = {
  success: <CheckmarkCircleIcon className="text-green-600" />,
  error: <CancelCircleIcon className="text-red-600" />,
  warning: <WarningCircleIcon className="text-yellow-600" />,
  info: <InfoCircleIcon className="text-blue-600" />,
};
const ringColors = {
  success: "ring-green-500/60",
  error: "ring-red-500/60",
  warning: "ring-yellow-500/60",
  info: "ring-blue-500/60",
};

const backgroundColors = {
  success: "bg-green-100",
  error: "bg-red-100",
  warning: "bg-yellow-100",
  info: "bg-blue-100",
};

const Toast = ({
  id,
  message,
  type = "info",
  duration = 5000,
  onRemove,
}: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onRemove]);

  return (
    <div
      className={`w-full rounded shadow-sm space-x-3 ${toastTypeClasses[type]} transition-transform transform translate-x-full animate-slide-in`}
    >
      <Button
        onClick={() => onRemove(id)}
        className="ml-4"
        isIconOnly
        variant="light"
      >
        <CancelCircleIcon className="w-4 h-4" />
      </Button>
      <span className="w-full text-wrap text-sm">{message}</span>

      <Button
        className={`w-10 h-10 ${backgroundColors[type]} flex justify-center items-center rounded-xl animate-progress pointer-events-none`}
        variant="light"
        isIconOnly
        disabled
      >
        {toastIcons[type]}
      </Button>
    </div>
  );
};

export default Toast;
