import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Esta es la vista de inicio</h1>

    <Link
      href="/Inicio"
      className=" font-semibold py-3 px-6  rounded-lg transition-all duration-200 shadow-md hover:opacity-90"
      style={{ backgroundColor: "var(--intense-pink)" }}
    >
      <h1 className="text-white">Continuar</h1>
    </Link>
    </div>
  );
}
