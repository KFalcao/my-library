"use client";

import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="w-full flex flex-col sm:flex-row sm:justify-center items-center px-4 sm:px-8 py-4 sm:pt-8 text-base sm:text-lg font-medium bg-background z-50 relative border-b">
      <div className="flex w-full sm:w-auto items-center justify-between sm:justify-center gap-2 sm:gap-6">

        <button
          className="sm:hidden flex flex-col justify-center items-center w-10 h-10 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Abrir menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-foreground my-1 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>

        <div className="hidden sm:flex gap-2 sm:gap-6">
          <Link href="/" className="border-x-2 rounded-lg px-4 py-2 hover:underline hover:border-2 hover:bg-muted transition whitespace-nowrap flex items-center justify-center">
            Home
          </Link>
          <Link href="/estante" className="border-x-2 rounded-lg px-4 py-2 hover:underline hover:border-2 hover:bg-muted transition whitespace-nowrap flex items-center justify-center">
            My Library
          </Link>
          <Link href="/dashboard" className="border-x-2 rounded-lg px-4 py-2 hover:underline hover:border-2 hover:bg-muted transition whitespace-nowrap flex items-center justify-center">
            Dashboard
          </Link>
        </div>
      </div>

      <div className="sm:static sm:mt-0 sm:ml-6">
        <div className="absolute top-4 right-4 sm:static sm:top-auto sm:right-auto">
          <ModeToggle />
        </div>
      </div>

      {menuOpen && (
        <div className="sm:hidden absolute top-full left-0 w-full bg-background shadow-md border-b z-40 animate-fade-in">
          <div className="flex flex-col gap-2 py-2 px-4">
            <Link href="/" className="rounded-lg px-3 py-2 hover:underline hover:bg-muted transition" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link href="/estante" className="rounded-lg px-3 py-2 hover:underline hover:bg-muted transition" onClick={() => setMenuOpen(false)}>
              My Library
            </Link>
            <Link href="/dashboard" className="rounded-lg px-3 py-2 hover:underline hover:bg-muted transition" onClick={() => setMenuOpen(false)}>
              Dashboard
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
