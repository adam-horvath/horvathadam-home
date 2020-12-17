import { PageModel } from './Page.model';

export interface TamburaPageModel extends PageModel {
  prizesTitle: string;
  prizes: Array<PrizeModel>;
  discsTitle: string;
  discs: Array<DiscModel>;
}

export interface PrizeModel {
  title: string;
  years: Array<number>;
  imageUrl: string | undefined;
}

export interface DiscModel {
  title: string;
  url: string;
  year: number;
}
