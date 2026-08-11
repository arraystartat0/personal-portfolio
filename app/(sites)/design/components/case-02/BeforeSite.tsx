import { beforeSite } from "../../data/blitzSite";
import styles from "./BeforeSite.module.css";

export default function BeforeSite() {
  return (
    <div className={styles.site}>
      <div className={styles.topbar}>
        {beforeSite.topbar.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <div className={styles.header}>
        <div className={styles.logo}>[ LOGO ]</div>
        <div className={styles.nav}>
          {beforeSite.nav.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>

      <div className={styles.carousel}>
        <div className={styles.carouselLabel}>{beforeSite.carousel}</div>
        <div className={`${styles.arrow} ${styles.arrowLeft}`}>‹</div>
        <div className={`${styles.arrow} ${styles.arrowRight}`}>›</div>
      </div>

      <div className={styles.body}>
        <div className={styles.columns}>
          {beforeSite.columns.map((column) => (
            <div key={column.title}>
              <div className={styles.columnRule} />
              <div className={styles.columnTitle}>{column.title}</div>
              <div className={styles.columnBody}>{column.body}</div>
            </div>
          ))}
        </div>

        <div className={styles.productsHeading}>{beforeSite.productsHeading}</div>

        <div className={styles.products}>
          {beforeSite.products.map((product) => (
            <div key={product.title} className={styles.product}>
              <div className={styles.productImage} />
              <div className={styles.productText}>
                <div className={styles.productTitle}>{product.title}</div>
                <div className={styles.productBody}>{product.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
