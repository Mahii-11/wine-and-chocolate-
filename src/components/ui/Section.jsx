/**
 * Shared section shell. Every home-page section uses this so spacing,
 * max width and side padding stay identical:
 *   - vertical padding: py-8 (mobile) / py-10 (lg)
 *   - container:        max-w-[1900px] with px-3 (same as the hero)
 */
function Section({ as: Tag = "section", className = "", containerClassName = "", children }) {
  return (
    <Tag className={`py-8 lg:py-10 ${className}`}>
      <div className={`mx-auto max-w-[1900px] px-3 ${containerClassName}`}>{children}</div>
    </Tag>
  );
}

export default Section;
