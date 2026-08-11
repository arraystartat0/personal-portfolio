import { shipped } from "../../data/salesSystem";
import Icon from "./AppIcons";
import AppDrawer from "./AppDrawer";
import { OrdersChart, PerCustomerChart, RevenueChart } from "./DashboardCharts";
import styles from "./ShippedSystem.module.css";

/**
 * The three screens that carry the argument, rebuilt in HTML rather than
 * screenshotted so they sit in the same frame vocabulary as the two renders
 * above and can be read line for line against them.
 *
 * Rebuilt from running source, not from a picture of it: the tokens are the ones
 * in the app's `main.scss`, the icons are the Font Awesome glyphs its markup
 * names, and the charts are drawn by Chart.js with the options copied out of its
 * `analytics.js`. That fidelity is the point. An after-frame that only
 * approximates the product proves nothing about the product.
 *
 * The source read is the build that carries no confidentiality obligation. What
 * these screens are evidence of is the design; they are not a claim about the
 * internals of the system Blitz runs, and the frame note says so.
 */

/** Which of the three renders this chrome belongs to. Only ids need it. */
type Screen = "dashboard" | "orders" | "trash";

/**
 * The chrome, with the lit nav pill passed in rather than baked into the data.
 * Orders and Trash both sit under Sales, so a single hardcoded "active" flag
 * would light Dashboard on all three screens and quietly contradict the thing
 * the render is meant to be evidence of.
 *
 * Below the app's own lg breakpoint this is a different screen, not a narrower
 * one: the rail goes, the greeting and the clock go with it, and a hamburger
 * appears in their place. That is the app's behaviour, and reproducing it is the
 * point. A render that stayed desktop-shaped on a phone would be contradicting
 * the argument it is evidence for.
 */
function Chrome({
  screen,
  active,
  children,
}: {
  screen: Screen;
  active: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.app}>
      {/*
        The toggler, the backdrop and the panel, all of which really work. Its
        own component because it is the one part of these renders that holds
        state, and keeping it there leaves the three screens server-rendered.
      */}
      <AppDrawer id={`sx-${screen}-drawer`} />

      <div className={styles.top}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.brand} src={shipped.brand.src} alt={shipped.brand.alt} />

        <div className={styles.greetingBlock}>
          <div className={styles.greeting}>{shipped.greeting}</div>
          <div className={styles.sub}>{shipped.sub}</div>
        </div>

        <div className={styles.stamp}>{shipped.stamp}</div>

        {/* A grey pill holding two white circles, which is how the app carries these. */}
        <div className={styles.topActions}>
          <span className={styles.topBtn}>
            <Icon name="user" size={11} />
          </span>
          <span className={styles.topBtn}>
            <Icon name="signOut" size={11} />
          </span>
        </div>
      </div>

      <div className={styles.shell}>
        <nav className={styles.sidebar}>
          {shipped.nav.map((item) => (
            <span
              key={item.label}
              className={`${styles.navItem} ${
                item.label === active ? styles.navItemActive : ""
              }`}
            >
              <Icon name={item.icon} size={10} />
              {item.label}
            </span>
          ))}
        </nav>

        {/*
          The footer lives inside the content column, not under the whole app.
          In the live markup it is a child of the same `.col` the cards sit in,
          so its left edge is the cards' left edge rather than the page's.
        */}
        <div className={styles.main}>
          {children}

          <div className={styles.footer}>
            <span className={styles.footerLeft}>
              {shipped.footer.left}
              <Icon name="heart" size={11} className={styles.footerHeart} />
              {shipped.footer.leftTail}
            </span>
            <span className={styles.footerRight}>
              <span>{shipped.footer.right}</span>
              <span>
                {shipped.footer.licencePrefix}{" "}
                <span className={styles.footerLicence}>{shipped.footer.licence}</span>
              </span>
            </span>
          </div>

          <div className={styles.version}>{shipped.version}</div>
        </div>
      </div>
    </div>
  );
}

export function ShippedDashboard() {
  return (
    <Chrome screen="dashboard" active="Dashboard">
      <div className={styles.kpis}>
        {shipped.kpis.map((kpi) => (
          <div key={kpi.label} className={styles.card}>
            {/* float-end in the real markup: a 25% lime tile with a lime glyph. */}
            <span className={styles.kpiBadge}>
              <Icon name={kpi.icon} size={13} />
            </span>
            <div className={styles.kpiLabel}>{kpi.label}</div>
            <div className={styles.kpiValue}>{kpi.value}</div>
            <div className={styles.kpiDelta}>
              <span className={styles.kpiPct}>
                <Icon name="trendUp" size={11} />
                {kpi.delta}
              </span>
              <span className={styles.kpiSince}>{kpi.since}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.chartRow}>
        <OrdersChart />
        <PerCustomerChart />
      </div>

      <div className={styles.lowerRow}>
        <RevenueChart />

        {/* h-100 in the live markup: the card matches the chart beside it. */}
        <div className={`${styles.card} ${styles.activityCard}`}>
          <div className={styles.cardTitle}>{shipped.activity.title}</div>
          <ul className={styles.timeline}>
            {shipped.activity.rows.map((row) => (
              <li key={row.lead} className={styles.timelineItem}>
                <span className={`${styles.timelineIcon} ${styles[row.kind]}`}>
                  <Icon name={row.icon} size={11} />
                </span>
                <div className={styles.timelineContent}>
                  <div className={`${styles.timelineLead} ${styles[`${row.kind}Text`]}`}>
                    {row.lead}
                  </div>
                  <div className={styles.timelineBody}>
                    {row.before}
                    <span className={styles.timelineLink}>
                      {row.link}
                      <Icon name="linkOut" size={8} />
                    </span>
                    {row.after}
                  </div>
                  <div className={styles.timelineWhen}>{row.when}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Chrome>
  );
}

export function ShippedOrders() {
  const { orders } = shipped;

  return (
    <Chrome screen="orders" active="Sales">
      <div className={styles.card}>
        <div className={styles.tabs}>
          {orders.tabs.map((tab) => (
            <span
              key={tab}
              className={`${styles.tab} ${tab === orders.activeTab ? styles.tabActive : ""}`}
            >
              {tab}
            </span>
          ))}
        </div>
      </div>

      {/* The toolbar sits on altdark, a shade darker than the cards around it. */}
      <div className={styles.toolbar}>
        <span className={styles.createBtn}>
          {orders.create}
          <Icon name="plus" size={10} />
        </span>

        <span className={styles.trashPill}>
          <span className={styles.beta}>{orders.beta}</span>
          <span className={styles.trashBtn}>
            {orders.trash}
            <Icon name="trashCan" size={12} />
          </span>
        </span>
      </div>

      <div className={styles.card}>
        <div className={styles.searchRow}>
          <Icon name="search" size={11} />
          <span className={styles.searchInput}>{orders.search}</span>
        </div>

        <div
          className={styles.tableWrap}
          role="region"
          aria-label={orders.tableLabel}
          tabIndex={0}
        >
          <table className={styles.table}>
            <thead>
              <tr>
                {orders.head.map((head) => (
                  <th key={head} scope="col">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.rows.map((row) => (
                <tr key={row.id}>
                  <td className={styles.opsCell}>
                    <span className={styles.iconBtn}>
                      <Icon name="eye" size={12} />
                    </span>

                    {/* A raised white pill holding the pencil, with the shimmering BETA tag. */}
                    <span className={styles.editPill}>
                      <span className={styles.editBtn}>
                        <Icon name="pencil" size={11} />
                      </span>
                      <span className={styles.beta}>{orders.beta}</span>
                    </span>

                    <span className={styles.deletePill}>
                      <span className={styles.deleteBtn}>
                        <Icon name="trash" size={11} />
                      </span>
                    </span>

                    <span className={styles.printBtn}>
                      <Icon name="print" size={11} />
                      {orders.printOrder}
                    </span>
                    <span className={styles.printBtn}>
                      <Icon name="dolly" size={11} />
                      {orders.printProduction}
                    </span>
                  </td>
                  <td>{row.id}</td>
                  <td>{row.customer}</td>
                  <td>{row.ordered}</td>
                  <td>{row.delivery}</td>
                  <td className={`${styles.statusCell} ${styles[row.tone]}`}>
                    <span className={styles.statusInner}>
                      <Icon name={row.statusIcon} size={10} />
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/*
          Spans, not anchors, like every other control in these renders. It also
          keeps PageTransition's click handler out of the frame entirely: it
          looks for the nearest <a>, and there is not one here to find.
        */}
        <nav className={styles.pager} aria-label={orders.pagination.label}>
          <ul className={styles.pagerList}>
            {orders.pagination.pages.map((page) => (
              <li key={page}>
                <span
                  className={`${styles.pageLink} ${
                    page === orders.pagination.activePage ? styles.pageLinkActive : ""
                  }`}
                >
                  {page}
                </span>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Chrome>
  );
}

export function ShippedTrash() {
  const { trash } = shipped;

  return (
    <Chrome screen="trash" active="Sales">
      <div className={styles.trashHeadBar}>
        <span className={styles.trashTitle}>{trash.title}</span>
        <span className={styles.trashBack}>← {trash.back}</span>
      </div>

      <div className={styles.toolbar}>
        {/*
          Below the app's md breakpoint the segmented rail is dropped for a grid
          of standalone pills, so the label needs a wrapper it can be truncated
          in and an empty bucket needs its own dimmer treatment. Emptiness is
          derived from the count rather than carried as a field: the count
          already says it, and a flag beside it would be a second source of
          truth for one fact.
        */}
        <div className={styles.trashTabs}>
          {trash.tabs.map((tab) => (
            <span
              key={tab.label}
              className={[
                styles.trashTab,
                tab.count === 0 ? styles.trashTabEmpty : "",
                tab.active ? styles.trashTabActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <Icon name={tab.icon} size={10} />
              <span className={styles.trashTabLabel}>{tab.label}</span>
              <span className={styles.trashBadge}>{tab.count}</span>
            </span>
          ))}
        </div>

        <div className={styles.trashControls}>
          <span className={styles.trashSearch}>
            <Icon name="search" size={10} />
            {trash.search}
          </span>
          <span className={styles.toggleWrap}>
            <span className={styles.toggle} aria-hidden="true" />
            {trash.historyToggle}
          </span>
          <span className={styles.refreshBtn}>
            <Icon name="refresh" size={11} />
          </span>
        </div>
      </div>

      {/*
        The legend explains the one rule that is not obvious: deleting a whole
        record and deleting a line out of a live one restore differently.
      */}
      <div className={styles.trashLegend}>
        <div className={styles.trashLegendItems}>
          {trash.legend.map((item) => (
            <span key={item.lead} className={styles.trashLegendItem}>
              <span
                className={`${styles.legendDot} ${
                  item.tone === "active" ? styles.dotActive : styles.dotDeleted
                }`}
                aria-hidden="true"
              />
              <strong>{item.lead}</strong> {item.body}
            </span>
          ))}
        </div>
        <span className={styles.retention}>
          <Icon name="clockBack" size={10} />
          {trash.retention}
        </span>
      </div>

      <div className={styles.card}>
        <div className={styles.trashRows}>
          {trash.rows.map((row) => (
            <div key={row.id} className={styles.trashRow}>
              <span
                className={`${styles.legendDot} ${
                  row.tone === "active" ? styles.dotActive : styles.dotDeleted
                }`}
                aria-hidden="true"
              />
              <div className={styles.trashText}>
                <div className={styles.trashRowTitle}>
                  {row.id} · {row.customer}
                </div>
                <div className={styles.trashRowMeta}>{row.removed}</div>
              </div>
              <span className={styles.trashExpiry}>{row.expires}</span>
              <span className={styles.restoreBtn}>{trash.restore}</span>
            </div>
          ))}
        </div>

        <div className={styles.emptyLabel}>{trash.emptyLabel}</div>
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon}>
            <Icon name="trashCan" size={19} />
          </span>
          <div className={styles.emptyTitle}>{trash.emptyTitle}</div>
          <div className={styles.emptyBody}>{trash.emptyBody}</div>
        </div>
      </div>
    </Chrome>
  );
}
