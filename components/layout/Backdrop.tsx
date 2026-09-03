export function Backdrop() {
  return (
    <>
      <div
        aria-hidden
        className="backdrop-grid pointer-events-none fixed inset-0 -z-10 opacity-70"
      />
      <div aria-hidden className="grain" />
    </>
  );
}
