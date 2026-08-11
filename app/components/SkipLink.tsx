type SkipLinkProps = {
  /**
   * The id of the landmark it jumps to. That element needs `tabIndex={-1}`, or
   * the jump moves the scroll position without moving focus and the next Tab
   * lands back at the top of the nav the link exists to skip.
   */
  targetId: string;
  className?: string;
  children?: React.ReactNode;
};

/**
 * The first focusable thing on the page, and invisible until it holds focus.
 *
 * It must be rendered before anything else focusable, which is the whole
 * contract: a skip link that is second in the tab order skips nothing. Each
 * site styles it in its own language by passing a class name, the same way
 * SiteSwitcher works, so the control is shared but the look never is.
 *
 * The style has one hard requirement of its own. Hiding it with `display: none`
 * or `visibility: hidden` takes it out of the tab order and deletes the feature;
 * it has to be moved off screen while staying focusable, and brought back on
 * `:focus`.
 */
export default function SkipLink({
  targetId,
  className,
  children = "Skip to content",
}: SkipLinkProps) {
  return (
    <a href={`#${targetId}`} className={className}>
      {children}
    </a>
  );
}
