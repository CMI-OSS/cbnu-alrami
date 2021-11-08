export interface NoticeScript {
  name: string;
  url: string;
  site_id: number;
  site: string;
  category: string;
  noticeListSelector: string;
  noticeContentsSelector: string;
  getNoticeList: Function;
  getContentsHtml: Function;
}
