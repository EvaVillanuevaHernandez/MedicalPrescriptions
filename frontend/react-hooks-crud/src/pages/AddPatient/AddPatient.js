import React, { useState } from "react";
import Header from "../../components/Header/Header";
import PatientsDataService from "../../services/PatientService";
import {useNavigate } from 'react-router-dom';
import './AddPatient.scss';

const AddPatient = () => {
  let navigate = useNavigate();

  const initialPatientsState = {
    id: null,
    name: "",
    surname: "",
    secondSurname: "",
    dni: "",
    history: "",
    image: null
  };

  const [patient, setPatient] = useState(initialPatientsState);
  const [submitted, setSubmitted] = useState(false);

  const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setPatient({ ...patient, [name]: value });
  };

  const savePatients = (event) => {
    event.preventDefault();
    console.log(event.target)
    var data = {
      name: patient.name,
      surname: patient.surname,
      secondSurname: patient.secondSurname,
      dni: patient.dni,
      history: patient.history,
      image: event.target.image.files[0]
    };

    PatientsDataService.create(data)
      .then(response => {
        setPatient({
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
      
   
  };

  const newPatients = () => {
    setPatient(initialPatientsState);
    setSubmitted(false);
    navigate("/patientsList");
  };


  return (
    <>
      <Header />
      <style>{'body { background-color: #DEE7E5 ; }'}</style>
      <div className="add-form" >
        {submitted ? (
          <div className="add">
            <button className="btn-add" onClick={newPatients} >
              Add
            </button>
            <h4 className="add">You submitted successfully, click add to finish!</h4>
          </div>
        ) : (

          <div className="container-addP">
            <form onSubmit={savePatients} >

              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" className="form-control" id="name"
                  required value={patient.name} onChange={handleInputChange} name="name"
                  minLength={3} maxLength={40}
                  pattern="[A-ZÄËÏÖÜÁÉÍÓÚÂÊÎÔÛÀÈÌÒÙ][a-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ]+"/>
              </div>

              <div className="form-group">
                <label htmlFor="surname">First surname:</label>
                <input type="text" className="form-control" id="surname"
                  requiredvalue={patient.surname} onChange={handleInputChange} name="surname"
                  minLength={3} maxLength={40}  
                  pattern="[A-ZÄËÏÖÜÁÉÍÓÚÂÊÎÔÛÀÈÌÒÙ][a-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ]+"/>
              </div>

              <div className="form-group">
                <label htmlFor="secondSurname">Second surname:</label>
                <input type="text" className="form-control" id="surname"
                  requiredvalue={patient.secondSurname} onChange={handleInputChange} name="secondSurname"
                  minLength={3} maxLength={40}  pattern="[A-ZÄËÏÖÜÁÉÍÓÚÂÊÎÔÛÀÈÌÒÙ][a-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ]+"
                  />
              </div>

              <div className="form-group">
                <label className="label" htmlFor="dni">Dni:</label>
                <input type="text" className="form-control" id="dni"
                  required value={patient.dni} onChange={handleInputChange} name="dni"
                  pattern="^[0-9]{8,8}[A-Za-z]$"
                  />
              </div>

              <div className="form-group" >
                <label id="label" htmlFor="history">History: </label>
                <input type="text" className="form-control-history" id="history"
                  required value={patient.history} onChange={handleInputChange} name="history"
                 />
              </div>
               <br/>
              <div className="form-group">
                <input type="file"  id="image" name="image" accept="image/png, image/jpeg"
                validations={[required]}  />
              </div>

              <button type="submit" className="btn-submit">
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
      <div id="elipse5">
        <img src="images/elipse5.png" alt="" />
      </div>

    </>
  );
};

export default AddPatient;