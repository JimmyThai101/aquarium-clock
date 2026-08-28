import { AquariumClock } from "@/components/AquariumClock";
import { ClockErrorBoundary } from "@/components/ClockErrorBoundary";

export default function Home() {
  return (
    <ClockErrorBoundary>
      <AquariumClock />
    </ClockErrorBoundary>
  );
}
