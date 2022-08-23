import { Route, Routes } from "react-router-dom";

import PageLayout from "src/components/Layout/Page/Page.view";

import Scraper from "./Scraper";

export default function ScraperRoute() {
  return (
    <PageLayout>
      <Routes>
        <Route path="/notice" element={<Scraper scraperType="notice" />} />
        <Route path="/student" element={<Scraper scraperType="cafeteria" />} />
        <Route path="/domitory" element={<Scraper scraperType="domitory" />} />
        <Route path="/calendar" element={<Scraper scraperType="calendar" />} />
        <Route path="/covid" element={<Scraper scraperType="covid" />} />
      </Routes>
    </PageLayout>
  );
}
