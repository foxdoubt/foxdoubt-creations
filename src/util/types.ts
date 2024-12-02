export type SelectedWorks = Queries.SanityShow["selectedWorks"];
export type Artwork = {
  readonly slug: { readonly current: string | null } | null;
};

export interface IPostLinkState {
  nextStepLinkText?: string;
  nextStepsLinkPath?: string;
}
