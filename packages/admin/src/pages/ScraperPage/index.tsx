import { Route, RouteComponentProps } from "react-router-dom";
import Navigation from "src/components/Navigation";
import Scraper from "src/components/Scraper";

export default function ScraperPage({ match }: RouteComponentProps) {
  return (
    <>
      <Navigation />
      <Route
        exact
        path={`${match.path}/notice`}
        render={() => <Scraper type="notice" />}
      />
      <Route
        exact
        path={`${match.path}/student`}
        render={() => <Scraper type="studentCafeteria" />}
      />
      <Route
        exact
        path={`${match.path}/domitory`}
        render={() => <Scraper type="domitoryCafeteria" />}
      />
      <Route
        exact
        path={`${match.path}/schedule`}
        render={() => <Scraper type="collegeSchedule" />}
      />
    </>
  );
}
