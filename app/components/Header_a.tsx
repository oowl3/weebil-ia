import React from "react";
import Logo from "./logobixil";
import Link from "next/link";

export default function Header_a() {
  return (
    <Link href="/Inicio" className="block w-full group">
      <header
        className="w-full bg-white shadow-sm rounded-b-[120px] border-t-4 border-black flex items-center justify-center py-20 
        transition-transform duration-300 ease-out group-hover:scale-[1.02] group-active:scale-95 cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <Logo />
          <h1 className="font-bold flex items-center select-none">
            <span className="text-black text-5xl">B</span>
            <span className="text-black text-5xl">I</span>
            <span className="text-green-600 text-5xl">X</span>
            <span className="text-black text-5xl">I</span>
            <span className="text-black text-5xl">L</span>
          </h1>
        </div>
      </header>
    </Link>
  );
}