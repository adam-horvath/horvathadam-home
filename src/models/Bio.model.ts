import {PageModel} from "./Page.model";

export interface BioPageModel extends PageModel {
  bioEvents: Array<BioModel>;
}

export interface BioModel {
  year: number;
  texts: BioEventText[];
}

export interface BioEventText {
  value?: string;
  href?: string;
}
