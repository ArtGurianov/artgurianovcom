import { GreetingAnimation } from "@/components/GreetingAnimation";

export default function HomePage() {
  return (
    <div className="absolute left-0 bottom-0 sm:h-2/3 w-4/5 sm:w-auto z-20">
      <div className="relative w-full sm:w-auto sm:h-full">
        <GreetingAnimation />
      </div>
    </div>
  );
}
