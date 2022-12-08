import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

import Header from "../../components/Header/Header";
import DoctorsDataService from "../../services/DoctorService";

import "./DoctorsList.scss"
import GroupItem from "../../components/GroupItem/GroupItem";


const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [currentDoctor, setCurrentDoctor] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
 

  useEffect(() => {
    retrieveDoctors();
  }, []);


  const retrieveDoctors = () => {
    DoctorsDataService.getAll()
      .then(response => {
        setDoctors(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const setActiveDoctor = (doctor, index) => {
    setCurrentDoctor(doctor);
    setCurrentIndex(index);
  };


  return (

    <>
      <Header/>
      <style>{'body { background-color: #DEE7E5 ; }'}</style>
      <IconContext.Provider value={{ color: '#231F20' }}>
        <div className="doctors">
          <div className="col-md-6">
            <h1 className="title">Doctors</h1>

            <div className="new-doctor">
              <Link to="/AddDoctor">
                <button className="button-new-doctor" type="button"><AiIcons.AiOutlinePlus /> New doctor </button>
              </Link>
            </div>
            <br />
            <div className="general">
              {
                doctors &&
                doctors.map((d, index) => (
                  <GroupItem active={index === currentIndex}
                    text={`${d.name} ${d.surname}`}
                    action={() => setActiveDoctor(d, index)}
                    index={index} key={index} />
                ))
              }

            </div>
            <div className="col-md-6">
              {currentDoctor ? (
                <div>
                  <div>
                    <label>
                      <strong>Name:</strong>
                    </label>{" "}
                    {currentDoctor.name}
                  </div>
                  <div>
                    <label>
                      <strong>Surname:</strong>
                    </label>{" "}
                    {currentDoctor.surname}
                  </div>
                  <div>
                    <label>
                      <strong>Second surname:</strong>
                    </label>{" "}
                    {currentDoctor.secondSurname}
                  </div>
                  <div>
                    <label>
                      <strong>Dni:</strong>
                    </label>{" "}
                    {currentDoctor.dni}
                  </div>

                  <div>
                    <label>
                      <strong>Collegiate number:</strong>
                    </label>{" "}
                    {currentDoctor.collegiateNum}
                  </div>


                  <div className="edit">
                    <Link
                      to={"/doctors/" + currentDoctor.id}>
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
export default DoctorsList;