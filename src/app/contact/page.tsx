import Breadcrumb from "@/components/contact/Breadcrumb";
import Hero from "@/components/contact/Hero";
import ContactCards from "@/components/contact/ContactCards";
import FAQ from "@/components/contact/FAQ";

export default function ContactPage() {
  return (
    <main>
      <Breadcrumb />
      <Hero />
      <ContactCards />
      <FAQ />
    </main>
  );
}
