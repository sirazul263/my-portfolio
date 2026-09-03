import Link from "next/link";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "accent";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-300 ease-expo disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-fg text-bg hover:bg-accent hover:text-accent-fg",
  accent: "bg-accent text-accent-fg hover:brightness-110",
  outline:
    "border border-line bg-transparent text-fg hover:border-fg/30 hover:bg-accent-soft",
  ghost: "text-muted hover:text-fg hover:bg-accent-soft",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-7 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md") {
  return cn(base, variants[variant], sizes[size]);
}

type Styling = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type AnchorProps = Styling & {
  href: string;
  /** Force a plain anchor with target=_blank even for relative paths. */
  external?: boolean;
} & Omit<ComponentProps<"a">, "href" | "className" | "children">;

type NativeButtonProps = Styling & {
  href?: never;
  external?: never;
} & Omit<ComponentProps<"button">, "className" | "children">;

export type ButtonProps = AnchorProps | NativeButtonProps;

function isExternal(href: string) {
  return (
    href.startsWith("http") || href.startsWith("mailto:") || href.endsWith(".pdf")
  );
}

export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { href, external, variant, size, className, children, ...rest } = props;
    const classes = cn(buttonClasses(variant, size), className);

    if (external || isExternal(href)) {
      return (
        <a
          href={href}
          className={classes}
          target={href.startsWith("mailto:") ? undefined : "_blank"}
          rel="noopener noreferrer"
          {...rest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant, size, className, children, ...rest } = props;
  return (
    <button type="button" className={cn(buttonClasses(variant, size), className)} {...rest}>
      {children}
    </button>
  );
}
