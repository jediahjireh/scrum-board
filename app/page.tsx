import Hero from "@/components/Hero";
import Orb from "@/components/ui/orb";

export default function Home() {
  return (
    <div className="scroll relative -mt-10 flex h-screen max-h-screen place-content-center place-items-center overflow-hidden">
      <Orb
        hoverIntensity={0.5}
        rotateOnHover={true}
        hue={0}
        forceHoverState={false}
      />

      <Hero />
    </div>
  );
}
