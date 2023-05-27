"use client";

import React, { PropsWithChildren, useEffect } from "react";

import "./Modal.css";

export type ModalProps = PropsWithChildren<{
  show?: boolean;
  title: string;
  confirmLabel?: string;
  isLoading?: boolean;
  variant?: "primary" | "danger";
  width?: string;
  onClose?: () => void;
  onConfirm?: () => void;
}>;

export default function Modal({
  show = false,
  title,
  confirmLabel = "Confirm",
  isLoading = false,
  variant = "primary",
  width = "384px",
  children,
  onClose,
  onConfirm,
}: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "auto";
  }, [show]);

  let confirmBtnClassName = "border-red-600 border-solid border px-3 py-2 text-white duration-300";
  confirmBtnClassName +=
    variant === "danger" ? " bg-red-700 hover:bg-red-800" : " bg-red-600 hover:bg-red-700";

  if (!show) return null;
  return (
    <div className="modal w-screen h-screen fixed top-0 left-0 flex justify-center items-center">
      <div className="relative z-10 bg-white rounded-md shadow-md shadow-gray-700/50" style={{ width }}>
        <div className="py-2 px-4 flex justify-between items-center border-b border-solid border-gray-200">
          <h2 className="font-semibold text-xl">{title}</h2>
          <button className="p-3 font-bold text-2xl" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="px-4 py-6">{children}</div>
        <div className="border-t border-solid border-gray-200 px-4 py-3 flex justify-end items-center gap-2">
          <button
            className="border-gray-500 border-solid border hover:bg-gray-600 px-3 py-2 text-gray-500 hover:text-white duration-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button disabled={isLoading} className={confirmBtnClassName} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
