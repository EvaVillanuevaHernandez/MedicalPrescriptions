import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

import Header from "../../components/Header/Header";
import PatientsDataService from "../../services/PatientService";
import "./PatientsList.scss"


const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [currentPatients, setCurrentPatients] = useState(null);
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
    setCurrentPatients(null);
    setCurrentIndex(-1);
  };

  const setActivePatients = (patients, index) => {
    setCurrentPatients(patients);
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
      <Header/>
      <style>{'body { background-color: #DEE7E5 ; }'}</style>
      <IconContext.Provider value={{ color: '#231F20' }}>
        <div className="patients">
          <div className="col-md-6">
            <h1 className="title">Patients</h1>

            <div className="container-search-bar">

              <input className="form-control" type="text" placeholder="Search by patient name" value={searchPatientName}
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
                patients && patients.map((patients, index) => (
                  <div className={"group-item " + (index === currentIndex ? "active" : "")}
                    onClick={() => setActivePatients(patients, index)}
                    key={index}>
                    <div>
                      <label className="label">
                        <strong>{patients.name}</strong>
                        <strong>{patients.surname}</strong>
                      </label>{" "}
                      <Link className="eye">
                        <FaIcons.FaEye />
                      </Link>
                    </div>
                  </div>

                ))
              }
            </div>
            <div className="col-md-6">
              {currentPatients ? (
                <div>
                  <div>
                    <label>
                      <strong>Name:</strong>
                    </label>{" "}
                    {currentPatients.name}
                  </div>
                  <div>
                    <label>
                      <strong>Surname:</strong>
                    </label>{" "}
                    {currentPatients.surname}
                  </div>
                  <div>
                    <label>
                      <strong>Dni:</strong>
                    </label>{" "}
                    {currentPatients.dni}
                  </div>
                 
                  <div>
                    <label>
                      <strong>History:</strong>
                    </label>{" "}
                    {currentPatients.history}
                  </div>
                 
                  <div class="edit">
                    <Link 
                      to={"/patients/" + currentPatients.id}>
                      <FaIcons.FaEdit />
                    </Link>
                  </div>
                  {/* <div class="edit">
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