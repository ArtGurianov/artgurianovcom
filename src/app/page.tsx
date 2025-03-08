import { GlitchPhoto } from "@/components/GlitchPhoto/GlitchPhoto";
import { GreetingTextAnimation } from "@/components/GreetingTextAnimation/GreetingTextAnimation";

export default function Home() {
  return (
    <div className="absolute left-0 bottom-0 sm:h-2/3 w-4/5 sm:w-auto z-20">
      <div className="relative w-full sm:w-auto sm:h-full">
        <GlitchPhoto />
        <GreetingTextAnimation />
      </div>
    </div>
  );
}
