import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout, Section } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/404")({
  head: () => ({
    meta: [
      { title: "Page Not Found — NetSpeed Maroc" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: NotFound,
});

function NotFound() {
  return (
    <Layout>
      <Section className="grid place-items-center py-32 text-center">
        <div>
          <h1 className="text-7xl font-bold text-primary">404</h1>
          <p className="mt-4 text-xl font-semibold">Page not found</p>
          <p className="mt-2 max-w-md text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
          <Link to="/" className="mt-8 inline-block"><Button>Back to home</Button></Link>
        </div>
      </Section>
    </Layout>
  );
}
