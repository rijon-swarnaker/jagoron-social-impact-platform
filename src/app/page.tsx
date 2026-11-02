import BannerSection from "@/components/HeroSection/BannerSection/BannerSection";
import RecentUpcomingEvent from "@/components/HeroSection/RecentUpcomingEvent";
import StayConnected from "@/components/HeroSection/StayConnected";
import WhyChooseJagoron from "@/components/HeroSection/WhyChooseJagoron";
import RecentUpcomingEventSkeleton from "@/components/Skeleton/RecentUpcomingEventSkeleton";
import { Suspense } from "react";





export default function Home() {
  return (
    <>
    <BannerSection/>
    <WhyChooseJagoron/>
    <Suspense fallback={<RecentUpcomingEventSkeleton />}>
        <RecentUpcomingEvent />
      </Suspense>
  
    
    <StayConnected/>
    </>
    
  );
}
