import { PageModel } from './Page.model';

export interface SaunaPageModel extends PageModel {
  saunaMaster: SaunaPagePartModel;
  programs: SaunaPagePartModel;
  favorites: SaunaPagePartModel;
  rules: SaunaPagePartModel;
}

export interface SaunaPagePartModel {
  title: string;
  texts: Array<TextModel>;
}

export interface TextModel {
  value: string;
  link?: string;
  image?: string;
  modalTitle?: string;
}
