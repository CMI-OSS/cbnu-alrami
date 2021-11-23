export interface NoticeScript {
  url: string;
  site_id: number;
  site: string;
  category: string;
  noticeListSelector: string;
  noticeContentsSelector: string;
  getNoticeList: Function;
  getContentsHtml: Function;
}
