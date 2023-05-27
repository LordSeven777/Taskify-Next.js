import React, {
  HTMLAttributes,
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

export type FormFieldProps = {
  as?: "input" | "textarea" | "select";
  errorMessage?: string;
} & InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement> &
  SelectHTMLAttributes<HTMLSelectElement>;

export default function FormField({ as = "input", errorMessage, className, ...attributes }: FormFieldProps) {
  let inputClassName = "block w-full bg-gray-200 rounded-sm px-3 py-2 border border-solid";
  inputClassName += " " + (errorMessage ? "border-red-500" : "border-gray-300");
  if (className) inputClassName += className;

  const input = React.createElement(as, {
    ...attributes,
    className: inputClassName,
  });

  return (
    <div className="mb-4">
      {input}
      {errorMessage && <p className="text-red-600 mt-2 text-sm">{errorMessage}</p>}
    </div>
  );
}
