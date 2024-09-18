import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import AuthProvider from "./components/authProvider";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/users"
          element={
            <AuthProvider>
              <Users />
            </AuthProvider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
