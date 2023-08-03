/* eslint-disable no-inner-declarations */
import { boardTree } from "@shared/board-tree/board-tree.generated";

const script = {
  url: "https://agecon.cbnu.ac.kr/?pg_idx=119",
  site_id: boardTree.전공.농업생명환경대학.농업경제학과.공지사항.id,
  site: "농업경제학과",
  category: "공지사항",
  noticeListSelector: "#bbs_contnets tbody > tr",
  noticeContentsSelector: ".dambbs_body",
  getNoticeList() {
    const list = document.querySelectorAll(this.noticeListSelector);
    return Array.from(list).map((item) => {
      const td = item.querySelectorAll("td");
      const urlTag = td[1].querySelector("a");
      let url = urlTag.href.trim();

      if (urlTag.getAttribute("onclick")) {
        function parseId(content) {
          const regex = /(\d+)/g;
          const matches = content.match(regex);
          if (matches && matches.length > 1) {
            return matches[1];
          }
          return null;
        }

        const id = parseId(urlTag.getAttribute("onclick"));

        if (id) url = `${script.url}&mod=view&pidx=${id}&page=1`;
      }

      return {
        site: this.site,
        category: this.category,
        site_id: this.site_id,
        title: td[1].querySelector("a").innerText.trim(),
        url,
        date:
          this.site === "농업경제학과"
            ? td[2].innerText.trim()
            : td[3].innerText.trim(),
      };
    });
  },
  getContentsHtml() {
    function removeParentElements() {
      // 문서 전체에서 link_sns 클래스를 가진 엘리먼트들 찾기
      const targetElements = document.getElementsByClassName("link_sns");

      // 찾은 엘리먼트들의 부모를 제거하기
      while (targetElements.length > 0) {
        const parentElement = targetElements[0].parentNode;
        parentElement.parentNode.removeChild(parentElement);
      }
    }

    removeParentElements();

    return document.querySelector(this.noticeContentsSelector).outerHTML;
  },
};

export default script;
