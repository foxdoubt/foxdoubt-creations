export type SelectedWorks = Queries.SanityShow["selectedWorks"];
export type Artwork = {
  readonly slug: { readonly current: string | null } | null;
};
