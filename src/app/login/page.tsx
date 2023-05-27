import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <div className="pt-10">
      <main style={{ width: "300px" }} className="mx-auto">
        <h1 className="text-2xl font-bold mb-8">Sign in into your account</h1>
        <LoginForm />
      </main>
    </div>
  );
}
