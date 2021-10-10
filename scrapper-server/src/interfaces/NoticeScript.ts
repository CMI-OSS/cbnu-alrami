export interface NoticeScript {
  name: string;
  url: string;
  site_id: number;
  site: string;
  category: string;
  waitNoticeListSelector: string;
  waitNoticeContentsSelector: string;
  getNoticeList: Function;
  getContentsHtml: Function;
}
