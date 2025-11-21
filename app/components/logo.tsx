import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/alacran.svg"
        width={40}
        height={40}
        alt="Logo Alacrán"
      />
    </div>
  );
}
