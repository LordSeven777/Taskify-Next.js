import Link from "next/link";

export default function Home() {
  return (
    <div className="h-full flex justify-center items-center text-center">
      <div>
        <header>
          <h1 className="text-4xl font-bold mb-3">Welcome to the taskify</h1>
          <p className="text-xl font-light text-gray-700 mb-7">Easily manage your tasks</p>
          <Link
            href="/login"
            className="px-6 py-3 text-xl font-semibold bg-green-700 hover:bg-green-800 duration-300 text-white inline-block"
          >
            Get started
          </Link>
        </header>
      </div>
    </div>
  );
}
