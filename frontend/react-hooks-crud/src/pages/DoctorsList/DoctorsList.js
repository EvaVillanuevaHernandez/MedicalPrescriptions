import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IconContext } from 'react-icons';
import * as AiIcons from 'react-icons/ai';
import ToggleDoc from '../../components/ToggleDoc/ToggleDoc';
import Header from "../../components/Header/Header";
import DoctorsDataService from "../../services/DoctorService";
import "./DoctorsList.scss"


const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [currentIndex] = useState(-1);
  const [searchDoctorName, setSearchDoctorName] = useState("");

  useEffect(() => {
    retrieveDoctors();
  }, []);

  const onChangeSearchDoctorName = e => {
    const searchDoctorName = e.target.value;
    setSearchDoctorName(searchDoctorName);
  };
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



  return (

    <>
      <Header />
      <style>{'body {  background-color: var(--background); }'}</style>
      <IconContext.Provider value={{ color: '#231F20' }}>
        <div className="doctors">
          <div className="col-md-6">
            <h4 className="title">Doctors</h4>
            <div className="container-search-bar">
              <input className="search-bar" type="text"
                placeholder="Search by doctors name"
                value={searchDoctorName}
                onChange={onChangeSearchDoctorName} />
              <i><AiIcons.AiOutlineSearch /></i>
            </div>
            <div className="new-doctor">
              <Link to="/AddDoctor">
                <button className="button-new-doctor" type="button"><AiIcons.AiOutlinePlus /> Doctor </button>
              </Link>
            </div>
            <br />
            <div className="general">
              {
                doctors &&
                doctors.filter(doctor => doctor.name.toLowerCase().search(searchDoctorName.toLowerCase()) !== -1).map((d, index) => (
                  <ToggleDoc active={index === currentIndex}
                    text={`${d.name} ${d.surname}`}
                    currentDoctor={d}
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
export default DoctorsList;