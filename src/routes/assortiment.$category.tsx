import { createFileRoute, redirect } from "@tanstack/react-router";
import type { ProductCategorySlug } from "@/lib/producten-content";

/**
 * Legacy route: /assortiment/{category}.
 *
 * The pre-Ayat catalogue used four legacy slugs. Phase 9 replaced them with the
 * eight real Ayat categories under /producten. Each old slug maps to the Ayat
 * category it was actually displaying, so an existing bookmark lands on the
 * right page instead of a 404; anything unrecognised falls back to the index.
 */
const LEGACY_SLUG_MAP: Record<string, ProductCategorySlug> = {
  lamsvlees: "doner",
  rundvlees: "shoarma",
  kip: "gevogelte",
  eindproducten: "vleessoorten",
};

export const Route = createFileRoute("/assortiment/$category")({
  beforeLoad: ({ params }) => {
    const target = LEGACY_SLUG_MAP[params.category];

    if (target) {
      throw redirect({
        to: "/producten/$category",
        params: { category: target },
        replace: true,
      });
    }

    throw redirect({ to: "/producten", replace: true });
  },
});
