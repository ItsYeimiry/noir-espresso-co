import { Shell } from "@/components/site/Shell";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("en");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Shell lang="en">{children}</Shell>;
}
