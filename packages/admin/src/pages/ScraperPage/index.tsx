import { Route } from "react-router-dom";
import Navigation from "src/components/Navigation";
import Scraper from "src/components/Scraper";

export default function ScraperPage() {
  return (
    <>
      <Navigation />
      <Route
        exact
        path="/scraper/notice"
        render={() => <Scraper scraperType="notice" />}
      />
      <Route
        exact
        path="/scraper/student"
        render={() => <Scraper scraperType="studentCafeteria" />}
      />
      <Route
        exact
        path="/scraper/domitory"
        render={() => <Scraper scraperType="domitoryCafeteria" />}
      />
      <Route
        exact
        path="/scraper/schedule"
        render={() => <Scraper scraperType="collegeSchedule" />}
      />
    </>
  );
}
