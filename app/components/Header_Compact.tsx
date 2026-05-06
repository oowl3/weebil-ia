import React from "react";
import Logo from "./logobixil";

export default function HeaderCompact() {
  return (
    <div className="flex items-center justify-center gap-3 py-6">
      <Logo />
      <h1 className="font-bold flex items-center select-none">
        <span className="text-[#1F2937] text-7xl">B</span>
        <span className="text-[#1F2937] text-7xl">I</span>
        <span className="text-[#7FB069] text-7xl">X</span>
        <span className="text-[#1F2937] text-7xl">I</span>
        <span className="text-[#1F2937] text-7xl">L</span>
      </h1>
    </div>
  );
}