import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IconContext } from 'react-icons';
import * as AiIcons from 'react-icons/ai';
import Header from "../../components/Header/Header";
import PatientsDataService from "../../services/PatientService";
import "./PatientsList.scss"
import TogglePat from "../../components/TogglePat/TogglePat";

const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [currentIndex] = useState(-1);
  const [searchPatientName, setSearchPatientName] = useState("");

  useEffect(() => {
    retrievePatients();
  }, []);

  const onChangeSearchPatientName = e => {
    const searchPatientName = e.target.value;
    setSearchPatientName(searchPatientName);
  };

  const retrievePatients = () => {
    PatientsDataService.getAll()
      .then(response => {
        setPatients(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <>
     <style>{'body { background-color: var(--background); }'}</style>
      <IconContext.Provider value={{ color: '#231F20' }}>
        <Header />
        <div className="patients">
          <div className="col-md-6">
            <h4 className="title-pat">Patients</h4>
            <div className="container-search-bar">
              <input className="search-bar" type="text"
                placeholder="Search by patient name"
                value={searchPatientName}
                onChange={onChangeSearchPatientName} />
              <i><AiIcons.AiOutlineSearch /></i>
            </div>

            <div className="new-patient">
              <Link to="/AddPatient">
                <button className="button-new-patient" type="button"><AiIcons.AiOutlinePlus /> Patient </button>
              </Link>
            </div>


            <br />
            <div className="general">
              {
                patients &&
                patients.filter(patient => patient.name.toLowerCase().search(searchPatientName.toLowerCase()) !== -1).map((p, index) => (
                  <TogglePat active={index === currentIndex}
                    text={`${p.name} ${p.surname}`}
                    patient={p}
                    index={index} key={index} />
                ))
              }
            </div>
          </div>
        </div>
        <div id="elipse5">
          <img src="/images/elipse5.png" alt="" />
        </div>
      </IconContext.Provider>
    </>
  );
};
export default PatientsList;