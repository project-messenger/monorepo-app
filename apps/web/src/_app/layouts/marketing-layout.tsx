import { SiteFooter } from "@/widgets/footer";
import { LandingHeader } from "@/widgets/landing-header";

export function MarketingLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <LandingHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
