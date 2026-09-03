import type { Metadata } from "next";

import { Changelog } from "@/components/home/Changelog";
import { GithubActivity } from "@/components/home/GithubActivity";
import { Hero } from "@/components/home/Hero";
import { SelectedWork } from "@/components/home/SelectedWork";
import { StackSnippet } from "@/components/home/StackSnippet";
import { getGithubProfile } from "@/lib/github";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const github = await getGithubProfile();

  return (
    <>
      <Hero github={github} />
      <StackSnippet />
      <SelectedWork />
      <Changelog />
      <GithubActivity profile={github} />
    </>
  );
}
