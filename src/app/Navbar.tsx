import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import NavbarLinks from "./NavbarLinks";
import "./Navbar.css";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav id="navbar" className="border-b border-solid border-b-gray-300">
      <div className="container h-full mx-auto flex justify-between items-center">
        <div className="text-2xl">📝</div>
        <NavbarLinks initialAuthenticated={session !== null} />
      </div>
    </nav>
  );
}
