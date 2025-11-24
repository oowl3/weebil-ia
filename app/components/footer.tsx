import Logo from "./logo";
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full py-10 px-6 bg-[#FCF4EE] text-black border-t mt-16">
      <div className="max-w-6xl mx-auto flex flex-row justify-between items-start gap-10">

        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <Logo />
            <h2 className="text-2xl font-bold">Weebil</h2>
          </div>

          <p className="text-sm">Copyright 2025 ©</p>
          <p className="text-sm">Weebil, All rights reserved.</p>
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">Contacto:</h3>
          <p className="text-sm">gorgojos@weebil.mx</p>
        </div>
   
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">Ayuda</h3>
          <Link href="/sepalabola" className="text-sm cursor-pointer hover:underline block mb-1">
            Preguntas frecuentes
          </Link>
          
          <Link href="/info" className="text-sm cursor-pointer hover:underline">
            Política de privacidad
          </Link>
        </div>

      </div>
    </footer>
  );
}