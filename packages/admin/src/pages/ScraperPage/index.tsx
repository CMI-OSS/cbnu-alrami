import { Routes, Route } from "react-router-dom";

import Scraper from "src/components/Scraper";

export default function ScraperPage() {
  return (
    <>
      <Routes>
        <Route path="/notice" element={<Scraper scraperType="notice" />} />
        <Route path="/student" element={<Scraper scraperType="cafeteria" />} />
        <Route path="/domitory" element={<Scraper scraperType="domitory" />} />
        <Route path="/calendar" element={<Scraper scraperType="calendar" />} />
        <Route path="/covid" element={<Scraper scraperType="covid" />} />
      </Routes>
    </>
  );
}
