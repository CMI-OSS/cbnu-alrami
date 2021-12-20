import { Route, RouteComponentProps } from "react-router-dom";
import Navigation from "src/components/Navigation";
import Scraper, { ScraperType } from "src/components/Scraper";

export default function ScraperPage({ match }: RouteComponentProps) {
  return (
    <>
      <Navigation />
      <Route
        exact
        path={`${match.path}/notice`}
        render={() => <Scraper type={ScraperType.Notice} />}
      />
      <Route
        exact
        path={`${match.path}/student`}
        component={() => <Scraper type={ScraperType.StudentCafeteria} />}
      />
      <Route
        exact
        path={`${match.path}/domitory`}
        component={() => <Scraper type={ScraperType.DomitoryCafeteria} />}
      />
      <Route
        exact
        path={`${match.path}/schedule`}
        component={() => <Scraper type={ScraperType.CollegeSchedule} />}
      />
    </>
  );
}
