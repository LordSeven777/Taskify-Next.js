import RegisterForm from "@/features/auth/RegisterForm";

export default function Register() {
  return (
    <div className="pt-10 pb-14">
      <main style={{ width: "300px" }} className="mx-auto">
        <h1 className="text-2xl font-bold mb-8">Create an account</h1>
        <RegisterForm />
      </main>
    </div>
  );
}
