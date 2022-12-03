import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

import Header from "../../components/Header/Header";
import PatientsDataService from "../../services/PatientService";

import "./PatientsList.scss"
import GroupItem from "../../components/GroupItem/GroupItem";


const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
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

  const refreshList = () => {
    retrievePatients();
    setCurrentPatient(null);
    setCurrentIndex(-1);
  };

  const setActivePatient = (patient, index) => {
    setCurrentPatient(patient);
    setCurrentIndex(index);
  };

  const removeAllPatients = () => {
    PatientsDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByPatientName = () => {
    PatientsDataService.findByPatientName(searchPatientName)
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
      <Header />
      <style>{'body { background-color: #DEE7E5 ; }'}</style>
      <IconContext.Provider value={{ color: '#231F20' }}>
        <div className="patients">
          <div className="col-md-6">
            <h1 className="title">Patients</h1>

            <div className="container-search-bar">

              <input className="form-control" type="text"
                placeholder="Search by patient name"
                value={searchPatientName}
                onChange={onChangeSearchPatientName} />

              <button className="search-button" type="button" onClick={findByPatientName}>
                <FaIcons.FaSearch />
              </button>
            </div>

            <div className="new-patient">
              <Link to="/AddPatients">
                <button className="button-new-patient" type="button"><AiIcons.AiOutlinePlus /> New patient </button>
              </Link>
            </div>
            <br />
            <div className="general">
              {
                patients &&
                patients.map((p, index) => (
                  <GroupItem active={index === currentIndex}
                    text={`${p.name} ${p.surname}`}
                    action={() => setActivePatient(p, index)}
                    index={index} key={index} />
                ))
              }

            </div>
            <div className="col-md-6">
              {currentPatient ? (
                <div>
                  <div>
                    <label>
                      <strong>Name:</strong>
                    </label>{" "}
                    {currentPatient.name}
                  </div>
                  <div>
                    <label>
                      <strong>Surname:</strong>
                    </label>{" "}
                    {currentPatient.surname}
                  </div>
                  <div>
                    <label>
                      <strong>Second surname:</strong>
                    </label>{" "}
                    {currentPatient.secondSurname}
                  </div>
                  <div>
                    <label>
                      <strong>Dni:</strong>
                    </label>{" "}
                    {currentPatient.dni}
                  </div>

                  <div>
                    <label>
                      <strong>History:</strong>
                    </label>{" "}
                    {currentPatient.history}
                  </div>


                  <div className="edit">
                    <Link
                      to={"/patients/" + currentPatient.id}>
                      <FaIcons.FaEdit />
                    </Link>
                  </div>
                  {/* <div className="edit">
                    <Link 
                      to={"/prescriptionsList"}>
                      <FaIcons.FaEdit />
                    </Link>
                  </div> */}
                </div>
              ) : (
                <></>
              )}
            </div>
            <button className="remove-button" onClick={removeAllPatients} >
              Remove all
            </button>
          </div>

        </div>
      </IconContext.Provider>
    </>
  );
};
export default PatientsList;