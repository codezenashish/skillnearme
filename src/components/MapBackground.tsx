import Image from "next/image";

export default function MapBackground() {
  return (
    <div className="absolute inset-0 opacity-55  pointer-events-none z-0 select-none">
      <Image
        src="/Frame.svg"
        alt="Local Map Background"
        fill
        className="object-cover "
        priority
      />
    </div>
  );
}
