import React, { useState } from "react";
import LoginPage from "./pages/Login.jsx";
import AdminPage from "./pages/Admin.jsx";
import HospitalPage from "./pages/Hospital.jsx";
import UserPage from "./pages/User.jsx";

import "./pages/Login.css";
import "./pages/Admin.css";
import "./pages/Hospital.css";
import "./pages/User.css";

export default function App() {
  const [role, setRole] = useState("login");

  if (role === "Admin") {
    return <div className="role-admin"><AdminPage /></div>;
  }

  if (role === "Hospital") {
    return <div className="role-hospital"><HospitalPage /></div>;
  }

  if (role === "User") {
    return <div className="role-user"><UserPage /></div>;
  }

  return (
    <div className="role-login">
      <LoginPage onLogin={setRole} />
    </div>
  );
}
