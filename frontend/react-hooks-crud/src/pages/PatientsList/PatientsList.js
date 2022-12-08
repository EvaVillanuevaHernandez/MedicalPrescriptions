import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import swal from 'sweetalert';
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

  const setActivePatient = (patient, index) => {
    setCurrentPatient(patient);
    setCurrentIndex(index);
  
  };



  // const showAlert = () => {
  //   swal({
  //     title:"Eliminar",
  //     text:"Are you sure you want to delete all patients?",
  //     icon:"warning",
  //     buttons:["No", "Sí"]
  //   }).then(respuesta=>{
  //     if(respuesta == true){
  //     swal({text: "All patients ares deleted!",
  //     icon:"success"})
  //     }
  //   })
      
  // };

  return (

    <>
      <Header />
      <style>{'body { background-color: #DEE7E5 ; }'}</style>
      <IconContext.Provider value={{ color: '#231F20' }}>
        <div className="patients">
          <div className="col-md-6">
            <h4 className="title">Patients</h4>

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
              
                </div>
              ) : (
                <></>
              )}
          
            </div>   
              
          </div>

        </div>
      </IconContext.Provider>
    </>
  );
};
export default PatientsList;