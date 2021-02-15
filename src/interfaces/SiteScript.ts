export interface SiteScript {
  name: string;
  url: string;
  site_id: number;
  getData: Function;
  getContentsHtml: Function;
}
