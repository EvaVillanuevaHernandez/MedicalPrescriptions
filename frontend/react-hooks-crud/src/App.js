import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import Login from "./components/Login/Login";
import PatientList from "./pages/PatientsList/PatientsList";
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
import Register from "./pages/Register/Register";
import Support from "./pages/Support/Support";
const App = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser,setCurrentUser] = useState(undefined);
 
  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
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
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="/support" element={<Support/>} />
        <Route path="/patientsList" element={<PatientList/>} />
        <Route path="/prescriptionsList" element={<PrescriptionsList />} />
        <Route path="/prescriptions" element={<Prescriptions/>} />
        <Route path="/prescriptions/:id" element={<Prescriptions/>} />
        <Route path="/AddPatient" element={<AddPatient />} />
        <Route path="/AddDoctor" element={<AddDoctor/>} />
        <Route path="/AddPrescription" element={<AddPrescription />} />
        <Route path="/patients/:id" element={<Patients />} />
        <Route path="/doctors/:id" element={<Doctors />} />
        <Route path="/doctorsList" element={<DoctorsList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};
export default App;