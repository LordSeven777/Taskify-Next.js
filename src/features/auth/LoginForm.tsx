"use client";

import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";
import { signIn } from "next-auth/react";

import FormField from "@/components/FormField";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  function handleChange(dispatcher: Dispatch<SetStateAction<string>>) {
    return (
      e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>,
    ) => dispatcher(e.target?.value ?? "");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(false);
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/tasks",
        redirect: false,
      });
      if (!result?.ok && result?.error === "CredentialsSignin") {
        setError(true);
      } else location.href = "/tasks";
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      {isError && (
        <div className="bg-red-200 px-4 py-3 mb-5 rounded-md">
          <p className="text-red-700 font-semibold">Wrong login credentials. Try again.</p>
        </div>
      )}
      <FormField
        type="email"
        placeholder="E-mail address"
        value={email}
        disabled={isLoading}
        onChange={handleChange(setEmail)}
      />
      <FormField
        type="password"
        placeholder="Password"
        value={password}
        disabled={isLoading}
        onChange={handleChange(setPassword)}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="mt-6 bg-green-600 text-lg font-semibold text-white text-center block w-full rounded py-2 px-4 duration-300 hover:bg-green-700"
      >
        {!isLoading ? "Authenticate" : "Authenticating ..."}
      </button>
    </form>
  );
}
