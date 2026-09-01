import { Careers } from "@/components/Careers";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Descent } from "@/components/Descent";
import { Process } from "@/components/Process";
import { Products } from "@/components/Products";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Story } from "@/components/Story";
import { getDictionary, type Locale } from "@/content";

/**
 * The page, in either language.
 *
 * Ordered as a descent that follows the water: the rock it comes from,
 * the journey down through it, what arrives in the bottle, and who
 * delivers it.
 */
export function SitePage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <>
      <SiteHeader t={t} />
      <main id="main">
        <Hero t={t} />
        <Descent t={t} />
        <Products t={t} />
        <Story t={t} />
        <Process t={t} />
        <Careers t={t} />
        <Contact t={t} />
      </main>
      <SiteFooter t={t} />
    </>
  );
}
