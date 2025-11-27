import { BrowserRouter, Routes, Route } from "react-router-dom";
import CandidatesPage from "./pages/CandidatesPage";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CandidatesPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}
