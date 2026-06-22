import MapBackground from "@/src/components/MapBackground";

const HeroSection = () => {
  return (
    <div className="relative h-[648px] flex flex-col items-center justify-center overflow-hidden">
      <MapBackground />

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold text-emerald-900 tracking-tight mb-6 leading-[1.1]">
          &apos First Hyperlocal Skill Discovery Platform
        </h1>

        <div className="mt-8 flex justify-center gap-6 flex-wrap text-sm text-muted-foreground">
          <span className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full backdrop-blur-sm">
            🔧 <span className="text-primary font-medium">2,000+</span>{" "}
            Electricians in Delhi
          </span>
          <span className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full backdrop-blur-sm">
            🪟 <span className="text-primary font-medium">1,500+</span> Window
            Cleaners in Mumbai
          </span>
          <span className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full backdrop-blur-sm">
            🛠️ <span className="text-primary font-medium">800+</span> Plumbers
            in Bangalore
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
