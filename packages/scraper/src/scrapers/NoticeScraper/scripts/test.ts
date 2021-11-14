import find from "find";
import { NoticeScript } from "@scraper/interfaces";

async function checkOverlapped() {
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

checkOverlapped();
