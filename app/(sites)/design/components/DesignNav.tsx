import SiteSwitcher from "../../../components/SiteSwitcher";
import { brand, navLinks } from "../data/site";
import ds from "../styles/design.module.css";
import styles from "./DesignNav.module.css";
import NavMenu from "./NavMenu";

export default function DesignNav() {
  return (
    <nav className={styles.nav}>
      {/*
        The name, the mark and the discipline as one block rather than three
        loose flex siblings. Loose, the square sat between two items that each
        wrapped on their own and it ended up stranded on a line by itself, which
        is why the discipline used to be deleted on a phone. Owned by a block, it
        drops under the name with the words it belongs to.
      */}
      <div className={styles.identity}>
        <a href="#top" className={styles.brand}>
          {brand.name}
        </a>
        <div className={styles.disciplineRow}>
          <span className={styles.mark} aria-hidden="true" />
          <span className={styles.discipline}>{brand.discipline}</span>
        </div>
      </div>

      <div className={styles.links}>
        <SiteSwitcher
          current="design"
          className={styles.switcher}
          linkClassName={styles.switchLink}
        />
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`${ds.underline} ${link.accent ? styles.linkAccent : styles.link}`}
          >
            {link.label}
          </a>
        ))}
      </div>

      <NavMenu />
    </nav>
  );
}
