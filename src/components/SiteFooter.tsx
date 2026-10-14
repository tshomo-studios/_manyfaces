import { Link } from "@tanstack/react-router";
import { FooterWordmark } from "@/components/FooterWordmark";

const COLUMNS = [
  { title: "Shop", links: ["FAQs"], product: true },
  { title: "Studio", links: ["About", "Contact us"] },
  { title: "Legal", links: ["Terms of service", "Privacy policy"] },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-4 pt-14 sm:grid-cols-3 sm:px-8 lg:px-14">
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="eyebrow mb-3 text-muted-foreground">{col.title}</p>
            <ul className="text-[28px] font-semibold leading-tight">
              {col.product && (
                <li>
                  <Link to="/grootman" className="transition-colors hover:text-muted-foreground">
                    Grootman
                  </Link>
                </li>
              )}
              {col.links.map((label) => (
                <li key={label}>
                  <a href="#" className="transition-colors hover:text-muted-foreground">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-[1440px] px-4 pt-12 sm:px-8 lg:px-14">
        <FooterWordmark className="h-auto w-full fill-foreground" />
      </div>
    </footer>
  );
}
