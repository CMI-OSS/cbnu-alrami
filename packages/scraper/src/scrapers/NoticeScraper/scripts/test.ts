import find from "find";
import NoticeScraper from "../index";
import { NoticeScript } from "@scraper/interfaces";
import { Scenario } from "../../Scenario";

function loadScripts(scriptPath: string): Promise<Array<NoticeScript>> {
  return new Promise((resolve, _) => {
    const scripts: Array<NoticeScript> = [];
    find.file(/\.js$/, scriptPath, (paths: string[]) => {
      for (const path of paths) {
        const script = require(path);
        scripts.push(script);
      }
      resolve(scripts);
    });
  });
}

function wait(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function checkOverlapped() {
  const scripts = await loadScripts(__dirname);

  for (const target of scripts) {
    const similarScripts = scripts.filter(
      (script) =>
        target.url === script.url ||
        target.site_id === script.site_id ||
        (target.site === script.site && target.category === script.category),
    );

    if (similarScripts.length > 1) {
      console.error(similarScripts);
      throw Error("비슷한 스크립트");
    }
  }

  console.log("No Similar scripts");
}

async function checkNoticeList() {
  await NoticeScraper.initScraper();
  NoticeScraper.pause();

  const scripts = await loadScripts(__dirname);

  for (const target of scripts) {
    try {
      const scenario = new Scenario(target);
      const notices = await NoticeScraper.getNoticeList(scenario);
      if (notices.length === 0) {
        throw Error("공지사항 리스트 없음");
      }
    } catch (error) {
      console.error(error);
      NoticeScraper.stop();
      throw Error(`[${target.site}] 공지사항 리스트 스크래핑 fail`);
    }

    await wait(1000);
  }
}

checkOverlapped();
checkNoticeList();
