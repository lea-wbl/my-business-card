import TiltingBusinessCard from "@/components/TiltingBusinessCard";

export default function Home() {
  return (
    <div className="h-[100dvh] bg-orange-50 bg-svg-dynamic p-6">
      <div className="max-w-screen-2xl mx-auto h-full grid place-content-center">
        <TiltingBusinessCard />
      </div>
    </div>
  );
}
