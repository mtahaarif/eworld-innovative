import { Fragment } from "react";
import type { AboutTab } from "@/content/home";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./AboutScrollSections.module.css";

type Card = { key: string; lead?: string; text: string };

/** Flattens a tab's content into the individual cards shown on the right. */
function cardsFor(tab: AboutTab): Card[] {
  switch (tab.kind) {
    case "milestones":
      return tab.items.map((item) => ({ key: item.lead, lead: item.lead, text: item.text }));
    case "values":
      return [{ key: "intro", text: tab.intro }, ...tab.items.map((item) => ({ key: item.lead, lead: item.lead, text: item.text }))];
    case "text":
      return tab.paragraphs.map((paragraph, index) => ({ key: String(index), text: paragraph }));
  }
}

/** Renders `**phrase**` markers in card copy as a highlighted span. */
function renderHighlighted(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, index) =>
    index % 2 === 1 ? (
      <mark className={styles.highlight} key={index}>
        {part}
      </mark>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}

/**
 * A sticky-scroll rundown of the About tabs: each heading pins to the left
 * (top, on narrow screens) while its own cards scroll past on the right
 * (below), then hands off to the next heading — done with plain CSS
 * (`position: sticky` scoped to each group's own grid row), no JS.
 */
export function AboutScrollSections({ tabs }: { tabs: readonly AboutTab[] }) {
  return (
    <div className={styles.wrap}>
      <div className="container">
        {tabs.map((tab, tabIndex) => (
          <div className={styles.group} key={tab.title}>
            <div className={styles.aside}>
              <span className={styles.index} aria-hidden="true">
                {String(tabIndex + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.heading}>{tab.title}</h3>
            </div>
            <div className={styles.cards}>
              {cardsFor(tab).map((card) => (
                <div className={styles.card} key={card.key}>
                  <Reveal>
                    <div className={styles.panel}>
                      {card.lead && <span className={styles.lead}>{card.lead}</span>}
                      <p className={styles.cardText}>{renderHighlighted(card.text)}</p>
                    </div>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
