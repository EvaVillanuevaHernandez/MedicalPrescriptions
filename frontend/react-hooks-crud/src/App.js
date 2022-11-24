import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import Login from "./components/Login/Login";
import PatientList from "./pages/PatientsList/PatientsList";
import AddPatients from "./pages/AddPatients/AddPatients";
import Patients from "./pages/Patients/Patients";
import EventBus from "./common/EventBus";



const App = () => {
  // const [,setShowModeratorBoard] = useState(false);
  const [,setShowAdminBoard] = useState(false);
  const [,setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      // setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    // setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/patients" element={<PatientList />} />
        <Route path="/AddPatients" element={<AddPatients />} />
        <Route path="/patients/:id" element={<Patients />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};
export default App;