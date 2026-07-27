import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Legacy route: /assortiment.
 *
 * Phase 9 rebuilt the catalogue around Ayat Food's own eight categories under
 * /producten, matching ayatfood.nl's hierarchy. This route is kept purely so
 * older links — internal or external — never dead-end. It redirects in
 * beforeLoad, so nothing renders first.
 */
export const Route = createFileRoute("/assortiment")({
  beforeLoad: () => {
    throw redirect({ to: "/producten", replace: true });
  },
});
