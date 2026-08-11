import { marketErp } from "../../data/salesSystem";
import styles from "./MarketErp.module.css";

/**
 * The category, not a product. Every label is generic terminology shared across
 * packaged systems, and no vendor's branding, colour or transaction code appears
 * anywhere: the diagnosis under this frame is an argument about how these
 * screens are put together, and naming one would turn it into something else.
 *
 * The thirty fields are rendered from the array rather than a representative
 * handful, because "every field on one screen" is a finding a reader is invited
 * to check by counting.
 */
export default function MarketErp() {
  return (
    <div className={styles.app}>
      <div className={styles.menu}>
        {marketErp.menu.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <div className={styles.toolbar}>
        {marketErp.toolbar.map((item) => (
          <span key={item} className={styles.toolButton}>
            {item}
          </span>
        ))}
      </div>

      <div className={styles.breadcrumb}>{marketErp.breadcrumb}</div>

      <div className={styles.titleRow}>
        <span className={styles.title}>{marketErp.title}</span>
        <span className={styles.code}>{marketErp.code}</span>
      </div>

      <div className={styles.body}>
        {/*
          No fieldsets, no headings, no order and no marked required fields. The
          grid is deliberately mechanical: every input is the same width and the
          same weight, which is exactly what makes it unreadable.
        */}
        <div className={styles.fields}>
          {marketErp.fields.map((field) => (
            <label key={field} className={styles.field}>
              <span className={styles.fieldLabel}>{field}</span>
              <span className={styles.input} />
            </label>
          ))}
        </div>

        <div
          className={styles.tableWrap}
          role="region"
          aria-label={marketErp.tableLabel}
          tabIndex={0}
        >
          <table className={styles.table}>
            <thead>
              <tr>
                {marketErp.tableHead.map((head) => (
                  <th key={head} scope="col">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {marketErp.tableRows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell || " "}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.buttons}>
          {marketErp.buttons.map((button) => (
            <span key={button} className={styles.button}>
              {button}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.status}>
        <span>{marketErp.status}</span>
        <span className={styles.licence}>{marketErp.licence}</span>
      </div>
    </div>
  );
}
