import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

import Header from "../../components/Header/Header";
import PrescriptionsDataService from "../../services/PrescriptionsService";
import "./PrescriptionsList.scss"

const PrescriptionsList = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [currentPrescriptions, setCurrentPrescriptions] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchPatientName, setSearchPatientName] = useState("");

  useEffect(() => {
    retrievePrescriptions();
  }, []);

  const onChangeSearchPatientName = e => {
    const searchPatientName = e.target.value;
    setSearchPatientName(searchPatientName);
  };

  const retrievePrescriptions = () => {
    PrescriptionsDataService.getAll()
      .then(response => {
        setPrescriptions(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrievePrescriptions();
    setCurrentPrescriptions(null);
    setCurrentIndex(-1);
  };

  const setActivePrescriptions = (prescriptions, index) => {
    setCurrentPrescriptions(prescriptions);
    setCurrentIndex(index);
  };

  const removeAllPrescriptions = () => {
    PrescriptionsDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByPatientName = () => {
    PrescriptionsDataService.findByPatientName(searchPatientName)
      .then(response => {
        setPrescriptions(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (

    <>
       
      <style>{'body { background-color: #DEE7E5 ; }'}</style>
      <IconContext.Provider value={{ color: '#231F20' }}>

        <Header />
        <div className="prescriptions">
          <div className="col-md-6">
            <h4 className="title">Patients</h4>
            <div className="container-search-bar">
              <input className="search-bar" type="text" placeholder="Search by patient name" value={searchPatientName}
                onChange={onChangeSearchPatientName} />
              <button className="search-button" type="button" onClick={findByPatientName}>
                <FaIcons.FaSearch />
              </button>
            </div>
            <div className="new-patient">
              <Link to="/Prescriptions">
                <button className="button-new-patient" type="button"><AiIcons.AiOutlinePlus /> New patient </button>
              </Link>
            </div>
            <br />
            <div className="general">
              {
                prescriptions && prescriptions.map((prescriptions, index) => (
                  <div className={"group-item " + (index === currentIndex ? "active" : "")}
                    onClick={() => setActivePrescriptions(prescriptions, index)}
                    key={index}>
                    <div>
                      <label>
                        <strong>{prescriptions.patientName}</strong>
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
              {currentPrescriptions ? (
                <div>
                  <div>
                    <label>
                      <strong>Name:</strong>
                    </label>{" "}
                    {currentPrescriptions.patientName}
                  </div>
                  <div>
                    <label>
                      <strong>Doctor:</strong>
                    </label>{" "}
                    {currentPrescriptions.doctorName}
                  </div>
                  <div>
                    <label>
                      <strong>Date:</strong>
                    </label>{" "}
                    {currentPrescriptions.date}
                  </div>
                  <div>
                    <label>
                      <strong>Medicine:</strong>
                    </label>{" "}
                    {currentPrescriptions.medicine}
                  </div>
                  <div>
                    <label>
                      <strong>Posology:</strong>
                    </label>{" "}
                    {currentPrescriptions.posology}
                  </div>

                  <Link className="edit"
                    to={"/prescriptions/" + currentPrescriptions.id}
                  >
                    <FaIcons.FaEdit />
                  </Link>
                </div>
              ) : (
                <></>
              )}
            </div>
            <button className="remove-button" onClick={removeAllPrescriptions} >
              Remove all 
            </button>
          </div>

        </div>
      </IconContext.Provider>
    </>
  );
};
export default PrescriptionsList;