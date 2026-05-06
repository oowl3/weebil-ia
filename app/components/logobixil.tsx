import Image from "next/image";

export default function LogoBixil() {
  return (
    <div className="flex items-center">
      <Image
        src="/logosinletra.svg"
        width={80}
        height={80}
        alt="Logo Bixil"
        priority
        className="object-contain"
      />
    </div>
  );
}