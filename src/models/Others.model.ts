import { PageModel } from './Page.model';

export interface OthersPageModel extends PageModel {
  parts: Array<WorkModel>;
}

export interface WorkModel {
  title: string;
  subtitle?: string;
  texts: Array<TextModel>;
}

export interface TextModel {
  value?: string;
  additional?: string;
  link?: string;
  uri?: string;
}
