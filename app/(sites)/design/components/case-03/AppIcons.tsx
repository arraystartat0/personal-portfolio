import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import {
  faArrowRightFromBracket,
  faArrowTrendUp,
  faBan,
  faBars,
  faBoxesStacked,
  faCartFlatbed,
  faCartShopping,
  faChevronDown,
  faCircleCheck,
  faClockRotateLeft,
  faCloudArrowUp,
  faDolly,
  faEye,
  faFileLines,
  faHeart,
  faHouse,
  faIndustry,
  faList,
  faMagnifyingGlass,
  faMoneyBillTrendUp,
  faPencil,
  faPenToSquare,
  faPlus,
  faPrint,
  faRectangleList,
  faRotateRight,
  faTrash,
  faTrashCan,
  faTruck,
  faUpRightFromSquare,
  faUser,
  faUsers,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

/**
 * The icon vocabulary of the shipped app: Font Awesome solid, the same set the
 * live system loads from its kit, so the renders carry the real glyphs instead
 * of my drawings of them.
 *
 * An earlier pass hand-drew these on a 16-unit grid. That was the wrong call and
 * it showed: fa-dolly in particular came out as a broken shopping trolley, and
 * an icon that reads as the wrong object is worse than no icon. Only the path
 * data is used here; the component and its sizing are ours, so nothing pulls in
 * the icon font or the FA React runtime.
 *
 * Icons are Font Awesome Free 6, CC BY 4.0 (fontawesome.com/license/free).
 */

const DEFS = {
  house: faHouse,
  boxes: faBoxesStacked,
  list: faRectangleList,
  cart: faCartShopping,
  user: faUser,
  signOut: faArrowRightFromBracket,
  users: faUsers,
  flatbed: faCartFlatbed,
  moneyTrend: faMoneyBillTrendUp,
  trendUp: faArrowTrendUp,
  eye: faEye,
  pencil: faPencil,
  trash: faTrash,
  trashCan: faTrashCan,
  print: faPrint,
  dolly: faDolly,
  plus: faPlus,
  search: faMagnifyingGlass,
  heart: faHeart,
  clockBack: faClockRotateLeft,
  refresh: faRotateRight,
  fileLines: faFileLines,
  ban: faBan,
  chevronDown: faChevronDown,
  linkOut: faUpRightFromSquare,
  /*
   * The mobile chrome. fa-bars is the navbar-toggler's glyph, and fa-xmark
   * stands in for Bootstrap's .btn-close, which is a background SVG rather than
   * an icon and so has no Font Awesome name to borrow.
   *
   * listPlain is not a duplicate of `list`. The live sidebar rail uses
   * fa-rectangle-list for Records and the live offcanvas uses fa-list for the
   * same item; the two disagree, and the renders reproduce the disagreement
   * rather than tidying it into something the app does not do.
   */
  bars: faBars,
  xmark: faXmark,
  listPlain: faList,
  /* The order pipeline, one glyph per status the sales table reports. */
  created: faPenToSquare,
  sync: faCloudArrowUp,
  production: faIndustry,
  dispatch: faTruck,
  completed: faCircleCheck,
} satisfies Record<string, IconDefinition>;

export type IconName = keyof typeof DEFS;

interface IconProps {
  name: IconName;
  /**
   * Rendered height in px. Width follows each glyph's own aspect ratio, which is
   * how Font Awesome itself sizes them: every icon shares a 512 height and
   * varies in width, so matching on height is what keeps a row of them optically
   * even.
   */
  size?: number;
  className?: string;
}

export default function Icon({ name, size = 12, className }: IconProps) {
  const [width, height, , , path] = DEFS[name].icon;
  const d = Array.isArray(path) ? path.join(" ") : path;

  return (
    <svg
      className={className}
      width={(size * width) / height}
      height={size}
      viewBox={`0 0 ${width} ${height}`}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d={d} />
    </svg>
  );
}
