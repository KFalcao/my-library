"use client";

import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  return (
    <nav className="flex justify-center items-center gap-6 px-8 pt-8 text-lg font-medium">
      <div className="flex justify-center wrap-cente gap-6 p-2">
      <Link href="/" className="border-x-2 rounded-lg p-4 hover:underline hover:border-2">
        Inicio
      </Link>
      <Link href="/estante" className="border-x-2 rounded-lg p-4 hover:underline hover:border-2">
        My Library
      </Link>
      <Link href="/dashboard" className="border-x-2 rounded-lg p-4 hover:underline hover:border-2">
        Dashboard
      </Link>
      </div>
      <ModeToggle/>
    </nav>
  );
}
