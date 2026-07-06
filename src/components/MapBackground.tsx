import Image from "next/image";
import bg from "@/src/assets/bg.jpg";

export default function MapBackground() {
  return (
    <div className="absolute inset-0 opacity-55  pointer-events-none z-0 select-none">
      <Image
        src={bg}
        alt="Local Map Background"
        fill
        className="object-cover"
      />
    </div>
  );
}
