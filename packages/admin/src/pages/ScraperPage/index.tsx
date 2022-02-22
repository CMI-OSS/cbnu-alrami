import { Routes, Route } from "react-router-dom";
import Scraper from "src/components/Scraper";

export default function ScraperPage() {
  return (
    <Routes>
      <Route path="/notice" element={<Scraper scraperType="notice" />} />
      <Route
        path="/student"
        element={<Scraper scraperType="studentCafeteria" />}
      />
      <Route
        path="/domitory"
        element={<Scraper scraperType="domitoryCafeteria" />}
      />
      <Route
        path="/schedule"
        element={<Scraper scraperType="collegeSchedule" />}
      />
    </Routes>
  );
}
