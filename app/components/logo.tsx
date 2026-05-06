import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center">
      <Image
        src="/logo.svg"
        width={40}
        height={40}
        alt="Logo Alacrán"
        priority
      />
    </div>
  );
}
