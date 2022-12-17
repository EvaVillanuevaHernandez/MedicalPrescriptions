import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IconContext } from 'react-icons';
import * as AiIcons from 'react-icons/ai';
import Header from "../../components/Header/Header";
import PrescriptionsDataService from "../../services/PrescriptionsService";
import TogglePresc from "../../components/TogglePresc/TogglePresc";
import "./PrescriptionsList.scss"

const PrescriptionsList = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [currentIndex] = useState(-1);
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

  return (
    <>
      <style>{'body {  background-color: var(--background); }'}</style>
      <IconContext.Provider value={{ color: '#231F20' }}>
        <Header />
        <div className="prescriptions">
          <div className="col-md-6">
            <h4 className="title">Prescriptions</h4>
            <div className="container-search-bar">
              <input className="search-bar" type="text" placeholder=" Search by patient name" 
                value={searchPatientName}
                onChange={onChangeSearchPatientName} />
              <i><AiIcons.AiOutlineSearch /></i>
            </div>

            <div className="new-prescription">
              <Link to="/AddPrescription">
                <button className="button-new-prescription" type="button"><AiIcons.AiOutlinePlus />Prescription </button>
              </Link>
            </div>
            <br />
            <div className="general">
              {
                prescriptions &&
                prescriptions.filter(prescriptions => prescriptions.patient.name.toLowerCase().search(searchPatientName.toLowerCase()) !== -1).map((p, index) => (
                  <TogglePresc active={index === currentIndex}
                    text={`${p.patient.name}`}
                    index={index} key={index}
                    currentPrescriptions={p} />
                ))
              }
            </div>
            <div id="elipse5">
              <img src="/images/elipse5.png" alt="" />
            </div>
          </div>
        </div>
      </IconContext.Provider>

    </>
  );
};
export default PrescriptionsList;