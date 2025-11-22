import React from "react";
import Logo from "./logo";

export default function Header_a() {
  return (
   <header
    className="w-full bg-white shadow-sm rounded-b-[120px] border-t-4 border-black flex items-center justify-center py-20">
  <div className="flex items-center gap-4">
    <Logo />
    <h1 className="font-bold flex items-center">
      <span className="text-(--intense-pink) text-5xl">W</span>
      <span className="text-(--black-deep) text-5xl">e</span>
      <span className="text-(--black-deep) text-5xl">e</span>
      <span className="text-(--black-deep) text-5xl">b</span>
      <span className="text-(--green-light) text-5xl">i</span>
      <span className="text-(--green-light) text-5xl">l</span>
    </h1>
  </div>
</header>

  );
}
