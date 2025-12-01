
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CandidatesPage from "./pages/CandidatesPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/Login";
import { AuthProvider } from "./AuthProvider";
import PrivateRoute from "./PrivateRoute";

export default function App() {
  return (
      <BrowserRouter>
        <Routes>

          {/* Public Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={

                <CandidatesPage />
            }
          />

          <Route
            path="/profile/:id"
            element={
                <ProfilePage />
            }
          />
        </Routes>
      </BrowserRouter>
  );
}

