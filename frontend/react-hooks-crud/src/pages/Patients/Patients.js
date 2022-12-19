import React, { useState, useEffect } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import swal from 'sweetalert';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from 'react-router-dom';
import PatientsDataService from "../../services/PatientService";
import Header from "../../components/Header/Header";
import * as BiIcons from 'react-icons/bi';

import './Patients.scss';

const Patients = props => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialPatientsState = {
    id: null,
    name: "",
    surname: "",
    secondSurname: "",
    dni: "",
    history: "",
    image: "",
    doctor:"",
    typeImg: ""
  };

  const [currentPatient, setCurrentPatient] = useState(initialPatientsState);
  const getPatients = id => {
    PatientsDataService.get(id)
      .then(response => {
        setCurrentPatient(response.data);
      })
      .catch(e => {
        console.log(e);    
      });
  };

  useEffect(() => {
    if (id) getPatients(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentPatient({ ...currentPatient, [name]: value });
  };


  const updatePatient = (event) => {
    event.preventDefault();
    let datitos = event.target;
    let updatedPatient = {
      id: currentPatient.id,
      name: datitos["name"].value,
      surname: datitos["surname"].value,
      secondSurname: datitos["secondSurname"].value,
      dni: datitos["dni"].value,
      history: datitos["history"].value
     
    }
    console.log("datitos en update", datitos)
    
    
    PatientsDataService.update(updatedPatient.id, updatedPatient)
      .then(response => {
        console.log("response data", response.data);
        updateAlert();
        navigate("/patientsList");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deletePatient = () => {
    PatientsDataService.remove(currentPatient.id)
      .then(response => {
        console.log(response.data);
        deleteAlert();
        navigate("/patientsList");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateAlert = () => {
    swal({
      title: "Update",
      text: "The Patient was updated successfully!",
      icon: "success",

    })
  };

  const deleteAlert = () => {
    swal({
      title: "Delete",
      text: "The Patient was deleted successfully!",
      icon: "success",

    })

  };

  return (
    <>
      <Header />
      <style>{'body {  background-color: var(--background); }'}</style>
      <div className="cabecera-pat">
        <p className="patient-name">{`${currentPatient.name} ${currentPatient.surname} ${currentPatient.secondSurname} `}</p>
      </div>

      <div className="form-p">
        <>
          <div>
            <Form onSubmit={updatePatient}>
              <div className="container-p">
                <Row className="mb-3">
                  <Form.Group as={Col} md="4">
                    <img src={`data:${currentPatient.typeImg};base64,${currentPatient.image}`}
                      alt=" " className="patient-image" onChange={handleInputChange} />
                  </Form.Group>
                  
                  <Form.Group as={Col} md="4"
                    className="position-relative">
                    <Form.Label> Name:</Form.Label>
                    <Form.Control type="text"
                      className="form-control"
                      id="name" name="name"  
                      value={currentPatient.name}
                      onChange={handleInputChange} required
                      pattern="[A-ZÄËÏÖÜÁÉÍÓÚÂÊÎÔÛÀÈÌÒÙ][a-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ]+"/>
                  </Form.Group>

                  <Form.Group as={Col} md="4"
                    className="position-relative">

                    <Form.Label>First surname:</Form.Label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      id="surname"
                      name="surname"
                      value={currentPatient.surname}
                      onChange={handleInputChange} 
                      pattern="[A-ZÄËÏÖÜÁÉÍÓÚÂÊÎÔÛÀÈÌÒÙ][a-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ]+"/>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  
                  <Form.Group as={Col} md="4"
                    className="position-relative">
                    <Form.Label>Second surname:</Form.Label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      id="secondSurname"
                      name="secondSurname"
                      value={currentPatient.secondSurname}
                      onChange={handleInputChange} required
                      pattern="[A-ZÄËÏÖÜÁÉÍÓÚÂÊÎÔÛÀÈÌÒÙ][a-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ]+"/>
                  </Form.Group>

                  <Form.Group as={Col} md="4"
                    className="position-relative">
                    <Form.Label>Dni:</Form.Label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      id="dni"
                      name="dni"
                      value={currentPatient.dni}
                      onChange={handleInputChange} required
                      pattern="^[0-9]{8,8}[A-Za-z]$"/>
                  </Form.Group>
                </Row>

                <Form.Group className="position-relative mb-3">
                  <Form.Label>History:</Form.Label>
                  <Form.Control
                    type="text"
                    className="form-control-history"
                    id="history"
                    name="history"
                    value={currentPatient.history}
                    onChange={handleInputChange} required
                  />
                </Form.Group>

              </div>

              <button type="submit" className="update-button" >
                <BiIcons.BiEditAlt />Update
              </button>

            </Form>

            <button className="delete-button" onClick={deletePatient}>
                <BiIcons.BiTrashAlt /> Delete
              </button>
          </div>

        </>  
      </div >
      <div id="elipse5">
          <img src="/images/elipse5.png" alt="" />
        </div>
    </>
  );
};

export default Patients;