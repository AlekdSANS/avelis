import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";

import { Logo } from "../Logo/Logo";
import { NewsletterForm } from "../NewsletterForm/NewsletterForm";

type FooterProps = {
  className?: string;
};

const footerSections = [
  {
    title: "Shop",
    links: [
      { label: "All Fragrances", to: "/shop" },
      { label: "New Arrivals", to: "/shop?sort=new" },
      { label: "Best Sellers", to: "/shop?sort=best-sellers" },
      { label: "Gift Sets", to: "/collections/gift-sets" },
    ],
  },
  {
    title: "Customer Care",
    links: [
      { label: "Contact", to: "/contact" },
      { label: "Delivery & Returns", to: "/delivery-returns" },
      { label: "FAQ", to: "/faq" },
      { label: "Fragrance Guide", to: "/fragrance-guide" },
    ],
  },
  {
    title: "About Avelis",
    links: [
      { label: "Our Story", to: "/about" },
      { label: "Materials", to: "/materials" },
      { label: "Journal", to: "/journal" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
      { label: "Cookies", to: "/cookies" },
    ],
  },
];

const socialLinks = ["Instagram", "Pinterest", "TikTok"];

export function Footer({ className }: FooterProps) {
  const classes = [styles.footer, className ?? ""].filter(Boolean).join(" ");

  return (
    <footer className={classes}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Logo showDescriptor />
          <p>
            Botanical compositions, quiet materials and modern European
            restraint for daily rituals.
          </p>
        </div>

        <div className={styles.newsletter}>
          <NewsletterForm />
          <p>
            A calm note when new fragrances, materials and seasonal edits are
            ready.
          </p>
        </div>

        <nav aria-label="Footer navigation" className={styles.linksGrid}>
          {footerSections.map((section) => (
            <section className={styles.linkSection} key={section.title}>
              <h2>{section.title}</h2>
              <ul>
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </nav>

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} AVELIS Parfums. All rights reserved.</p>
          <ul aria-label="Social links" className={styles.socialLinks}>
            {socialLinks.map((social) => (
              <li key={social}>
                <a href="/" onClick={(event) => event.preventDefault()}>
                  {social}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
