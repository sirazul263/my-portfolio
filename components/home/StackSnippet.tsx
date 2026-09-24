import Link from "next/link";

import { skillGroups } from "@/content/skills";
import { site } from "@/content/site";

type Token = { text: string; kind?: "kw" | "key" | "str" | "punct" | "comment" };
type Line = Token[];

const kindClass: Record<NonNullable<Token["kind"]>, string> = {
  kw: "text-accent",
  key: "text-fg",
  str: "text-muted",
  punct: "text-faint",
  comment: "text-faint italic",
};

function pick(title: string, count: number) {
  const group = skillGroups.find((g) => g.title.toLowerCase().startsWith(title));
  return (group?.items ?? []).slice(0, count);
}

function arrayLine(key: string, items: string[]): Line {
  const line: Line = [{ text: "  " }, { text: key, kind: "key" }, { text: ": [", kind: "punct" }];
  items.forEach((item, i) => {
    line.push({ text: `"${item}"`, kind: "str" });
    if (i < items.length - 1) line.push({ text: ", ", kind: "punct" });
  });
  line.push({ text: "],", kind: "punct" });
  return line;
}

/** A real TypeScript object built from the same content that powers the about page. */
function buildLines(): Line[] {
  return [
    [{ text: "// stack.ts — defaults, not an exhaustive list", kind: "comment" }],
    [
      { text: "export const ", kind: "kw" },
      { text: "stack", kind: "key" },
      { text: " = {", kind: "punct" },
    ],
    arrayLine("frontend", pick("frontend", 5)),
    arrayLine("mobile", pick("mobile", 3)),
    arrayLine("backend", pick("backend", 5)),
    arrayLine("data", pick("data", 4)),
    arrayLine("practices", pick("practices", 4)),
    [{ text: "} ", kind: "punct" }, { text: "as const", kind: "kw" }, { text: ";", kind: "punct" }],
    [{ text: "" }],
    [
      { text: "export const ", kind: "kw" },
      { text: "currently", kind: "key" },
      { text: " = {", kind: "punct" },
    ],
    [
      { text: "  " },
      { text: "at", kind: "key" },
      { text: ": ", kind: "punct" },
      { text: `"${site.current.company}"`, kind: "str" },
      { text: ",", kind: "punct" },
    ],
    [
      { text: "  " },
      { text: "building", kind: "key" },
      { text: ": ", kind: "punct" },
      { text: `"${site.current.product}"`, kind: "str" },
      { text: ",", kind: "punct" },
    ],
    [
      { text: "  " },
      { text: "timezone", kind: "key" },
      { text: ": ", kind: "punct" },
      { text: `"${site.timezone}"`, kind: "str" },
      { text: ",", kind: "punct" },
    ],
    [{ text: "};", kind: "punct" }],
  ];
}

export function StackSnippet() {
  const lines = buildLines();

  return (
    <section className="container-x pb-24 sm:pb-32">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-4">
          <p className="mono-label">Defaults</p>
          <h2 className="mt-5 text-3xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-4xl">
            What I reach for when nobody has picked a stack yet.
          </h2>
          <p className="mt-5 text-muted">
            Typed end to end, boring where it should be boring. The full toolkit, including
            the things I use once a quarter, lives on the{" "}
            <Link href="/about" className="link-underline text-fg">
              about page
            </Link>
            .
          </p>
        </div>

        <div className="min-w-0 lg:col-span-8">
          <div className="overflow-hidden rounded-2xl border border-line bg-elevated/70 shadow-2xl shadow-black/10">
            <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
              <span className="flex gap-1.5" aria-hidden>
                <span className="size-2.5 rounded-full bg-line" />
                <span className="size-2.5 rounded-full bg-line" />
                <span className="size-2.5 rounded-full bg-line" />
              </span>
              <span className="rounded-md border border-line bg-bg/60 px-2 py-0.5 font-mono text-[11px] text-muted">
                stack.ts
              </span>
              <span className="ml-auto font-mono text-[11px] text-faint">TypeScript</span>
            </div>
            <pre className="overflow-x-auto px-4 py-5 font-mono text-[13px] leading-[1.7] sm:px-6">
              <code>
                {lines.map((line, i) => (
                  <span key={i} className="flex">
                    <span className="w-8 shrink-0 select-none pr-4 text-right text-faint">
                      {i + 1}
                    </span>
                    <span className="whitespace-pre">
                      {line.map((token, j) => (
                        <span key={j} className={token.kind ? kindClass[token.kind] : undefined}>
                          {token.text}
                        </span>
                      ))}
                    </span>
                  </span>
                ))}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
