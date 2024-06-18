"use client";

import { useToast } from "@/context/ToastContext";
import Toast from "./Toast";

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();
  return (
    <div className="fixed bottom-4 right-1/2 translate-x-1/2 w-fit max-w-[375px] md:max-w-screen-sm md:translate-x-0 md:bottom-4 md:right-4 z-50 flex flex-col gap-4">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onRemove={removeToast} />
      ))}
    </div>
  );
};

export default ToastContainer;
