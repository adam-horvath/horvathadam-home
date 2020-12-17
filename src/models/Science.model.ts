import { PageModel } from './Page.model';

export interface SciencePageModel extends PageModel {
  publications: Array<PublicationModel>;
}

export interface PublicationModel {
  year: number;
  authors: string;
  title: string;
  link: string | null;
  info: string;
}
