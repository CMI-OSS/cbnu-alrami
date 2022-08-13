import "src/common/env";
import { login } from "./api/login";
import "./socket/server";

login(process.env.SCRAPER_ID as string, process.env.SCRAPER_PWD as string);
