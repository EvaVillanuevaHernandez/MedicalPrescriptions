import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import Login from "./components/Login/Login";
import PatientList from "./pages/PatientsList/PatientsList";
import PrescriptionsList from "./pages/PrescriptionsList/PrescriptionsList";
import Prescriptions from "./pages/Prescriptions/Prescriptions";
import AddPatients from "./pages/AddPatients/AddPatients";
import AddPrescriptions from "./pages/AddPrescriptions/AddPrescriptions";
import Patients from "./pages/Patients/Patients";
import EventBus from "./common/EventBus";
import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home";
import Settings from "./pages/Settings/Settings";
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
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="/patients" element={<PatientList/>} />
        <Route path="/prescriptionsList" element={<PrescriptionsList />} />
        <Route path="/prescriptions" element={<Prescriptions/>} />
        <Route path="/prescriptions/:id" element={<Prescriptions/>} />
        <Route path="/AddPatients" element={<AddPatients />} />
        <Route path="/AddPrescriptions" element={<AddPrescriptions />} />
        <Route path="/patients/:id" element={<Patients />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};
export default App;