import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserViewPage from "./pages/UserViewPage";
import UpdatePage from "./pages/UpdatePage";
import PhotoUploadPage from "./pages/PhotoUploadPage";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <h1>Welcome To User Management App</h1>

        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/view"
            element={
              <PrivateRoute>
                <UserViewPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/update/:id"
            element={
              <PrivateRoute>
                <UpdatePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/upload/:id"
            element={
              <PrivateRoute>
                <PhotoUploadPage />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
