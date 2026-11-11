import styles from "./RelatedLinksSection.module.css";

type RelatedLink = {
  title: string;
  description: string;
  href: string;
};

type Props = {
  title: string;
  description: string;
  links: readonly RelatedLink[];
};

export const supportLinks: readonly RelatedLink[] = [
  {
    title: "IT-support i Stockholm",
    description: "Läs mer om IT-hjälp för privatpersoner och företag.",
    href: "https://www.mindatorsupport.se/itsupport-stockholm/",
  },
  {
    title: "Supportavtal för företag",
    description: "Utforska löpande IT-support och supportavtal.",
    href: "https://www.mindatorsupport.se/supportavtal/",
  },
  {
    title: "Microsoft 365 och Windows",
    description: "Läs mer om support för Microsoft 365 och Windows.",
    href: "https://www.mindatorsupport.se/microsoft-365-windows-support/",
  },
];

export default function RelatedLinksSection({
  title,
  description,
  links,
}: Props) {
  return (
    <section className={styles.section} aria-label={title}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>

        <div className={styles.grid}>
          {links.map((link) => (
            <a
              className={styles.card}
              href={link.href}
              key={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.cardContent}>
                <strong>{link.title}</strong>
                <span>{link.description}</span>
                <span className={styles.destination}>
                  Öppnas på en extern webbplats
                </span>
              </span>

              <span className={styles.arrow} aria-hidden="true">
                ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}