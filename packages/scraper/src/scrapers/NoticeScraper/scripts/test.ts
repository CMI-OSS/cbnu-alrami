import find from "find";
import "src/socket/server";
import { NoticeScript } from "src/types";
import { Scenario } from "../../Scenario";
import NoticeScraper from "../index";

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

const startTargetStie = "ALL"; // "ALL" or "학과명" e.g. "전기공학부"

async function checkNoticeList() {
  await NoticeScraper.init();
  NoticeScraper.pause();

  const scripts = await loadScripts(__dirname);
  let start = true

  for (const target of scripts) {
    if (target.site === startTargetStie) {
      start = true;
    }

    if (!start) continue;

    try {
      const scenario = new Scenario(target.site,target);
      const notices = await NoticeScraper.getNoticeList(scenario);
      console.log(notices)
      if (notices.length === 0) {
        throw Error("공지사항 리스트 없음");
      }
    } catch (error) {
      console.error(error);
      NoticeScraper.stop();
      throw Error(`[${target.site}] 공지사항 리스트 스크래핑 fail`);
    }

    console.log((`[${target.site} > ${target.category}] Pass!`))

    await wait(500);
  }

  NoticeScraper.stop();
}

checkOverlapped();
checkNoticeList();
