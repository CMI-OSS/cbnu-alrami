import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { BoardWrite } from "src/components/Board";

export default function ScraperPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/list" element />
        <Route path="/write" element={<BoardWrite />} />
      </Routes>
    </Suspense>
  );
}
