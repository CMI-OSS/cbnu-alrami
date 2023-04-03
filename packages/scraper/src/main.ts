import { apiServer } from "@shared/constant";
import { OpenAPI } from "@shared/swagger-api/generated/core/OpenAPI";

import { scrapingCafeterias } from "./cafeteria-scraper/cafeteria-scraper";
import { login } from "./common/login";

OpenAPI.BASE = apiServer.local;

login();
scrapingCafeterias();
