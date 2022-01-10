import { useLocation } from "react-router-dom";
import Navigation from "src/components/Navigation";
import Scraper from "src/components/Scraper";

export default function ScraperPage() {

  const location = useLocation();
  
  return (
    <>
      <Navigation />
      {location.pathname === '/scraper/notice' && <Scraper scraperType="notice" />}
      {location.pathname === '/scraper/student' && <Scraper scraperType="studentCafeteria" />}
      {location.pathname === '/scraper/domitory' && <Scraper scraperType="domitoryCafeteria" />}
      {location.pathname === '/scraper/schedule' && <Scraper scraperType="collegeSchedule" />}
    </>
  );
}
