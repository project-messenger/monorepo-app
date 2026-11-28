import { useId } from "react";

import { Logo } from "@/shared/ui/logo";
import { Typography } from "@/shared/ui/typography";

import type { AuthStoryContent } from "../model/types";

export function AuthStory({ content }: { content: AuthStoryContent }) {
  const headingId = useId();

  return (
    <aside
      aria-labelledby={headingId}
      className="hidden min-w-0 flex-col gap-8 bg-auth-story p-8 text-auth-story-foreground lg:flex xl:p-12"
    >
      <Logo />
      <div className="flex flex-1 flex-col justify-center gap-6">
        <Typography as="h2" variant="display-auth" id={headingId}>
          {content.heading}
        </Typography>
        <Typography
          variant="subtitle-hero"
          className="text-auth-story-muted-foreground"
        >
          {content.description}
        </Typography>
      </div>
      <div className="rounded-2xl bg-auth-story-card p-6">
        <Typography variant="label-field" className="text-auth-story-accent">
          {content.card.overline}
        </Typography>
        <div className="mt-4">
          <Typography variant="hero-card-text">
            {content.card.channel}
          </Typography>
          <Typography variant="hero-card-text">
            {content.card.message}
          </Typography>
        </div>
        <Typography variant="body" className="mt-6 text-auth-story-accent">
          {content.card.outcome}
        </Typography>
      </div>
      <Typography
        variant="body-small"
        className="text-auth-story-muted-foreground"
      >
        {content.footer}
      </Typography>
    </aside>
  );
}
