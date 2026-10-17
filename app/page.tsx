import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Features from "@/components/Features";
import Comparison from "@/components/Comparison";
import Visuals from "@/components/Visuals";
import Process from "@/components/Process";
import Strengths from "@/components/Strengths";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import WaitlistForm from "@/components/WaitlistForm";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export default function Home() {
  return (
    <>
      <AnalyticsTracker />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <Comparison />
        <Visuals />
        <Process />
        <Strengths />
        <FAQ />
        <Testimonials />
        <WaitlistForm />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}