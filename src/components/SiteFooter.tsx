import { FooterWordmark } from "@/components/FooterWordmark";

const LINKS = ["about", "contact us", "FAQs", "terms of service", "privacy policy"];

export function SiteFooter() {
  return (
    <footer className="flex flex-col pt-24">
      <div className="px-10 md:px-20">
        <ul className="text-5xl font-semibold">
          {LINKS.map((label) => (
            <li key={label} className="transition-colors delay-75 hover:text-muted-foreground">
              <a href="#">{label}</a>
            </li>
          ))}
        </ul>
      </div>
      <FooterWordmark className="h-auto w-full fill-foreground" />
    </footer>
  );
}
