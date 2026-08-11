import { prototypeApp } from "../../data/salesSystem";
import styles from "./PrototypeApp.module.css";

/**
 * My own first version, drawn without flattery. It is Bootstrap's defaults over
 * Blitz's green, which is what it actually was, and the three things the audit
 * beneath it names are all visible here: the stacked coloured buttons standing
 * in for a navigation, the modal that every task opened into, and the customer
 * table printing fourteen columns at one weight.
 *
 * Poppins because the real thing used it. This render and the shipped one share
 * the client's typeface so the comparison is treatment against treatment.
 */
export default function PrototypeApp() {
  return (
    <div className={styles.app}>
      <div className={styles.navbar}>
        <div className={styles.brand}>{prototypeApp.brand}</div>
        <div className={styles.nav}>
          {prototypeApp.nav.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>

      <div className={styles.hero}>
        <div className={styles.greeting}>{prototypeApp.greeting}</div>
        <div className={styles.sub}>{prototypeApp.sub}</div>

        {/* Three headings, eight buttons, and no idea which one you want. */}
        {prototypeApp.groups.map((group) => (
          <div key={group.heading} className={styles.group}>
            <div className={styles.groupHeading}>{group.heading}</div>
            <div className={styles.buttons}>
              {group.buttons.map((button) => (
                <span key={button} className={`${styles.button} ${styles[group.tone]}`}>
                  {button}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.tableSection}>
        <div className={styles.tableHeading}>{prototypeApp.table.heading}</div>
        <div
          className={styles.tableWrap}
          role="region"
          aria-label={prototypeApp.tableLabel}
          tabIndex={0}
        >
          <table className={styles.table}>
            <thead>
              <tr>
                {prototypeApp.table.head.map((head) => (
                  <th key={head} scope="col">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {prototypeApp.table.rows.map((row) => (
                <tr key={row[1]}>
                  {row.map((cell, index) => (
                    <td key={index}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/*
        Drawn open, over a scrim, because every task in this version happened
        inside one of these. A closed modal would let the render off the hook for
        the finding directly underneath it.
      */}
      <div className={styles.modalLayer}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <span>{prototypeApp.modal.title}</span>
            <span className={styles.modalClose} aria-hidden="true">
              ×
            </span>
          </div>
          <div className={styles.modalBody}>
            {prototypeApp.modal.fields.map((field) => (
              <label key={field} className={styles.modalField}>
                <span className={styles.modalLabel}>{field}</span>
                <span className={styles.modalInput} />
              </label>
            ))}
          </div>
          <div className={styles.modalFooter}>
            <span className={`${styles.button} ${styles.success}`}>
              {prototypeApp.modal.submit}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
