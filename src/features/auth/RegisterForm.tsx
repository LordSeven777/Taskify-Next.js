"use client";

import { Dispatch, FormEvent, SetStateAction, ChangeEvent, useReducer, useState } from "react";
import { signIn } from "next-auth/react";

import FormField from "@/components/FormField";
import { RegisterPayload } from "./register";
import { AuthenticationResult } from "@/types/auth";
import isApiError from "@/helpers/is-api-error.helper";

type RegistrationErrors = Partial<Record<keyof RegisterPayload, string[]>>;

async function apiRegister(payload: RegisterPayload) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL as string}/auth/register`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (res.status >= 400) {
    const errorData = await res.json();
    throw { statusCode: res.status, data: errorData };
  }
  const authResult = (await res.json()) as AuthenticationResult;
  return authResult;
}

export default function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [isLoading, setLoading] = useState(false);

  const [errors, setErrors] = useReducer(
    (errors: RegistrationErrors, payload: RegistrationErrors) => payload,
    {},
  );

  function handleChange(dispatcher: Dispatch<SetStateAction<string>>) {
    return (
      e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>,
    ) => dispatcher(e.target?.value ?? "");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const payload: RegisterPayload = {
      firstName,
      lastName,
      username,
      email,
      password,
      passwordConfirmation,
    };
    setLoading(true);
    setErrors({});
    let authResult: AuthenticationResult;
    try {
      authResult = await apiRegister(payload);
    } catch (error) {
      console.log(error);
      if (isApiError<RegistrationErrors>(error)) {
        if (error.statusCode < 500) setErrors(error.data);
      }
      setLoading(false);
      return;
    }
    try {
      await signIn("credentials", {
        email: authResult.user.email,
        password: payload.password,
        callbackUrl: "/tasks",
        redirect: true,
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <FormField
        value={firstName}
        disabled={isLoading}
        placeholder="First name"
        errorMessage={errors.firstName && errors.firstName[0]}
        onChange={handleChange(setFirstName)}
      />
      <FormField
        value={lastName}
        disabled={isLoading}
        placeholder="Last name"
        errorMessage={errors.lastName && errors.lastName[0]}
        onChange={handleChange(setLastName)}
      />
      <FormField
        value={username}
        disabled={isLoading}
        placeholder="Username"
        errorMessage={errors.username && errors.username[0]}
        onChange={handleChange(setUsername)}
      />
      <FormField
        value={email}
        disabled={isLoading}
        type="email"
        placeholder="E-mail address"
        errorMessage={errors.email && errors.email[0]}
        onChange={handleChange(setEmail)}
      />
      <FormField
        value={password}
        disabled={isLoading}
        type="password"
        placeholder="Password"
        errorMessage={errors.password && errors.password[0]}
        onChange={handleChange(setPassword)}
      />
      <FormField
        value={passwordConfirmation}
        disabled={isLoading}
        type="password"
        placeholder="Confirm your password"
        errorMessage={errors.passwordConfirmation && errors.passwordConfirmation[0]}
        onChange={handleChange(setPasswordConfirmation)}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="mt-6 bg-green-600 text-lg font-semibold text-white text-center block w-full rounded py-2 px-4 duration-300 hover:bg-green-700"
      >
        {!isLoading ? "Register" : "Registering..."}
      </button>
    </form>
  );
}
