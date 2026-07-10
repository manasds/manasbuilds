export function normalizeSlug(slug: string): string {
  return slug.replace(/^\/+|\/+$/g, "");
}

export const POST_BY_SLUG_FILTER = `_type == "post" && (
  slug.current == $slug ||
  slug.current == $slashSlug
)`;
