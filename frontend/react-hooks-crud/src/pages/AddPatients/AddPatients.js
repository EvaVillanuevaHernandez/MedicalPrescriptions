import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import PatientsDataService from "../../services/PatientService";
import './AddPatients.scss';


const AddPatients = () => {
  const initialPatientsState = {
    id: null,
    name: "",
    surname: "",
    secondSurname: "",
    dni: "",
    history: ""
  };
  const [patients, setPatients] = useState(initialPatientsState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setPatients({ ...patients, [name]: value });
  };

  const savePatients = () => {
    var data = {
      name: patients.name,
      surname: patients.surname,
      secondSurname: patients.secondSurname,
      dni: patients.dni,
      history: patients.history
    };

    PatientsDataService.create(data)
      .then(response => {
        setPatients({
          id: response.data.id,
          name: response.data.name,
          surname: response.data.surname,
          secondSurname: response.data.secondSurname,
          dni: response.datadni,
          history: response.data.history
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
      Navigate('/patients');
  };

  const newPatients = () => {
    setPatients(initialPatientsState);
    setSubmitted(false);
  };


  return (
    <>
      <Header />
      <style>{'body { background-color: #DEE7E5 ; }'}</style>
      <div className="add-form" >
        {submitted ? (
          <div className="add">
            <button className="btn-add" onClick={newPatients}>
              Add
            </button>
            <h4 className="add">You submitted successfully, click add to finish!</h4>

          </div>
        ) : (

          <div className="container">

            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" className="form-control" id="name"
                required value={patients.name} onChange={handleInputChange} name="name"
                minLength={3} maxLength={40} />
            </div>

            <div className="form-group">
              <label htmlFor="surname">Surname:</label>
              <input type="text" className="form-control" id="surname"
                requiredvalue={patients.surname} onChange={handleInputChange} name="surname"
                minLength={3} maxLength={40} />
            </div>

            <div className="form-group">
              <label htmlFor="secondSurname">Second surname:</label>
              <input type="text" className="form-control" id="surname"
                requiredvalue={patients.secondSurname} onChange={handleInputChange} name="secondSurname"
                minLength={3} maxLength={40} />
            </div>

            <div className="form-group">
              <label className="label" htmlFor="dni">Dni:</label>
              <input type="text" className="form-control" id="dni"
                required value={patients.dni} onChange={handleInputChange} name="dni"
                maxLength={9} />
            </div>

            <div className="form-group" >
              <label id="label" htmlFor="history">History: </label>
              <input type="text" className="form-control-history" id="history"
                required value={patients.history} onChange={handleInputChange} name="history" />
            </div>

            {/* <div className="form-group">
              <input type="file"
                id="image" name="image"
                accept="image/png, image/jpeg" />
            </div> */}

            <button onClick={savePatients} className="btn-submit">
              Submit
            </button>

          </div>
        )}
      </div>
      <div id="elipse5">
        <img src="images/elipse5.png" alt="" />
      </div>

    </>
  );
};

export default AddPatients;