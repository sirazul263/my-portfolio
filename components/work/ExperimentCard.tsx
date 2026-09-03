import { ExternalLink } from "lucide-react";

import { SocialIcon } from "@/components/ui/SocialIcon";
import { Tag } from "@/components/ui/Tag";
import type { MiniProject } from "@/content/projects";

export function ExperimentCard({ item }: { item: MiniProject }) {
  return (
    <article className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-elevated/40 p-5 transition-all duration-500 ease-expo hover:border-fg/20 hover:bg-elevated/70">
      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold tracking-tight">{item.title}</h3>
          <div className="flex items-center gap-1">
            <a
              href={item.repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${item.title} source on GitHub`}
              className="grid size-8 place-items-center rounded-full text-faint transition-colors hover:bg-accent-soft hover:text-fg"
            >
              <SocialIcon name="github" className="size-4" />
            </a>
            {item.live && (
              <a
                href={item.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.title} live site`}
                className="grid size-8 place-items-center rounded-full text-faint transition-colors hover:bg-accent-soft hover:text-fg"
              >
                <ExternalLink className="size-4" />
              </a>
            )}
          </div>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted">{item.summary}</p>
      </div>
      <ul className="mt-5 flex flex-wrap gap-1.5">
        {item.stack.map((t) => (
          <li key={t}>
            <Tag>{t}</Tag>
          </li>
        ))}
      </ul>
    </article>
  );
}
