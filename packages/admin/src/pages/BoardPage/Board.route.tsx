import { Route, Routes } from "react-router-dom";

import PageLayout from "src/components/Layout/Page/Page.view";

import Article from "./Article/Article";
import ArticleWrite from "./ArticleWrite/ArticleWrite";

export default function ScraperPage() {
  return (
    <PageLayout>
      <Routes>
        <Route path="/list" element />
        <Route path="/write" element={<ArticleWrite />} />
        <Route path="/articles/:articleId" element={<Article />} />
      </Routes>
    </PageLayout>
  );
}
