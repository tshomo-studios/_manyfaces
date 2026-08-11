import { FooterWordmark } from "@/components/FooterWordmark";

const LINKS = ["about", "contact us", "FAQs", "terms of service", "privacy policy"];

export function SiteFooter() {
  return (
    <footer className="flex flex-col pt-28 lg:pt-36">
      <div className="px-7 md:px-20 lg:px-28">
        <ul className="space-y-1 text-2xl font-semibold md:text-3xl">
          {LINKS.map((label) => (
            <li key={label}>
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <FooterWordmark className="mt-16 h-auto w-full fill-foreground lg:mt-24" />
    </footer>
  );
}
