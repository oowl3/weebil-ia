"use client";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  const handleLogout = () => {
    // callbackUrl: A dónde vamos después de salir (tu pantalla de login)
    signOut({ callbackUrl: "/Registro" });
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors duration-200"
      title="Cerrar sesión"
    >
      <LogOut className="w-4 h-4" />
      <span>Salir</span>
    </button>
  );
}