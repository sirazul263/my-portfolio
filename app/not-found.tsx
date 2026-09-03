import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-start justify-center">
      <p className="mono-label">404</p>
      <h1 className="mt-5 text-5xl font-semibold tracking-[-0.03em] sm:text-7xl">
        This page <span className="serif-italic text-accent">wandered off.</span>
      </h1>
      <p className="mt-6 max-w-md text-lg text-muted">
        The link may be old or the page may have moved. Try one of these instead.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/">Home</Button>
        <Button href="/work" variant="outline">
          Work
        </Button>
      </div>
    </section>
  );
}
