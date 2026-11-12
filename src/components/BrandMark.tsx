export function BrandMark() {
  return (
    <svg className="brand-mark" viewBox="0 0 64 64" fill="none" aria-hidden="true" focusable="false">
      {/* Asymmetric cut corners give the frame its own geometric silhouette. */}
      <path className="brand-frame" d="M18 4H49L60 15V46L46 60H15L4 49V18Z" />
      <path className="brand-frame-accent" d="M4 28V18L18 4H28M60 36V46L46 60H36" />
      {/* Custom letterforms: a wide T and an open, geometric P. */}
      <path className="brand-letter" d="M16 22H33M24.5 22V44M37 44V22H43C52 22 52 36 43 36H37" />
    </svg>
  )
}
