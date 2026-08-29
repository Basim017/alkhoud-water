import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { Journey } from "@/components/Journey";
import { Products } from "@/components/Products";
import { Story } from "@/components/Story";
import { Process } from "@/components/Process";
import { Careers } from "@/components/Careers";
import { Contact } from "@/components/Contact";
import { SiteFooter } from "@/components/SiteFooter";

/**
 * The page is ordered as a descent, following the water: rain and ridge
 * line at the top, down through the aquifer, into the bottle, and back up
 * to the people who deliver it.
 */
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Journey />
        <Products />
        <Story />
        <Process />
        <Careers />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
