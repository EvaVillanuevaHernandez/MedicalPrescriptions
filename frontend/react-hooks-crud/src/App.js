import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import Login from "./components/Login/Login";
import PatientList from "./pages/PatientsList/PatientsList";
import PrescriptionsInfo from"./pages/PrescriptionsInfo/PrescriptionsInfo";
import PrescriptionsList from "./pages/PrescriptionsList/PrescriptionsList";
import DoctorsList from "./pages/DoctorsList/DoctorsList";
import Prescriptions from "./pages/Prescriptions/Prescriptions";
import AddPatient from "./pages/AddPatient/AddPatient";
import AddPrescription from "./pages/AddPrescription/AddPrescription";
import AddDoctor from "./pages/AddDoctor/AddDoctor";
import Patients from "./pages/Patients/Patients";
import EventBus from "./common/EventBus";
import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home";
import Settings from "./pages/Settings/Settings";
import Doctors from "./pages/Doctors/Doctors";

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
        <Route path="/prescriptionsInfo" element={<PrescriptionsInfo/>} />
        <Route path="/prescriptions/:id" element={<Prescriptions/>} />
        <Route path="/AddPatient" element={<AddPatient />} />
        <Route path="/AddDoctor" element={<AddDoctor/>} />
        <Route path="/AddPrescription" element={<AddPrescription />} />
        <Route path="/patients/:id" element={<Patients />} />
        <Route path="/doctors/:id" element={<Doctors />} />
        <Route path="/doctors" element={<DoctorsList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};
export default App;