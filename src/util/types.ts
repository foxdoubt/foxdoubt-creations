export type ShowQueryEdges = Queries.GetAllShowsQuery["allSanityShow"]["edges"];
export type SelectedWorks = ShowQueryEdges[0]["node"]["selectedWorks"];
export type Artwork = {
  readonly slug: { readonly current: string | null } | null;
};
