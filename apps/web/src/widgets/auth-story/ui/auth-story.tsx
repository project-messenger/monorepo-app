import { Logo } from "@/shared/ui/logo";
import { Typography } from "@/shared/ui/typography";

import { authStoryContent } from "../config/content";

export function AuthStory() {
  return (
    <aside
      aria-labelledby="auth-story-heading"
      className="hidden min-h-[62.5rem] flex-col bg-sidebar px-[3.375rem] py-[2.625rem] text-sidebar-foreground lg:flex"
    >
      <div className="h-[10.5rem] shrink-0">
        <Logo />
      </div>
      <div className="flex-1 pb-10">
        <Typography
          as="h2"
          variant="display-auth"
          id="auth-story-heading"
          className="whitespace-pre-line"
        >
          {authStoryContent.heading}
        </Typography>
        <Typography
          variant="subtitle-hero"
          className="mt-[1.7rem] ml-0.5 max-w-[28.125rem] whitespace-pre-line text-inverse-foreground dark:text-sidebar-item-foreground"
        >
          {authStoryContent.description}
        </Typography>
      </div>
      <div className="min-h-[13.1875rem] shrink-0 rounded-2xl bg-inverse-surface px-6 py-[1.75rem] dark:bg-sidebar-accent">
        <Typography variant="label-field" className="text-sidebar-primary">
          {authStoryContent.card.overline}
        </Typography>
        <div className="mt-[0.9375rem]">
          <Typography variant="hero-card-text">
            {authStoryContent.card.channel}
          </Typography>
          <Typography variant="hero-card-text">
            {authStoryContent.card.message}
          </Typography>
        </div>
        <Typography variant="body" className="mt-10 text-sidebar-primary">
          {authStoryContent.card.outcome}
        </Typography>
      </div>
      <Typography
        variant="body-small"
        className="mt-[5.0625rem] shrink-0 text-inverse-foreground dark:text-sidebar-item-foreground"
      >
        {authStoryContent.footer}
      </Typography>
    </aside>
  );
}
