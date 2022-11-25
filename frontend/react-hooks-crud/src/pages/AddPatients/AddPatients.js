import React, { useState } from "react";
import Header from "../../components/Header/Header";
import PatientsDataService from "../../services/PatientService";

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './AddPatients.scss';


const AddPatients = () => {
  const initialPatientsState = {
    id: null,
    name: "",
    surname: "",
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
      dni: patients.dni,
      history: patients.history
    };

    PatientsDataService.create(data)
      .then(response => {
        setPatients({
          id: response.data.id,
          name: response.data.name,
          surname: response.data.surname,
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
    setPatients(initialPatientsState);
    setSubmitted(false);
  };

  return (
    <>
      <Header />
      <style>{'body { background-color: #DEE7E5 ; }'}</style>
      <div className="add-form" >
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn-add" onClick={newPatients}>
              Add
            </button>
          </div>
        ) : (
          <Form >
            <div className="container">
              <Row>
                <Form.Group as={Col} md="4"
                  className="position-relative">

                  <Form.Label> Name:</Form.Label>
                  <Form.Control type="text"
                    className="form-control"
                    id="name" required value={patients.name}
                    onChange={handleInputChange} name="name" />
                </Form.Group>

                <Form.Group as={Col} md="4"
                  className="position-relative">

                  <Form.Label> Surname:</Form.Label>
                  <Form.Control type="text"
                    className="form-control"
                    id="surname" required value={patients.surname}
                    onChange={handleInputChange} surname="surname" />
                </Form.Group>

              </Row>

              <Form.Group as={Col} md="4"
                className="position-relative">

                <Form.Label> Dni:</Form.Label>
                <Form.Control type="text" className="form-control"
                  id="dni" required value={patients.dni}
                  onChange={handleInputChange} name="dni" />
              </Form.Group>

              
              <Form.Group as={Col} md="4"
                className="position-relative">
                  <Form.Label> History:</Form.Label>
                  <Form.Control type="text" className="history"
                    id="history" required value={patients.history}
                    onChange={handleInputChange} name="history" />
                </Form.Group>

                <button onClick={savePatients} className="btn-submit">
                  Submit
                </button>
              </div>
          </Form>

        )}
      </div>
      <div id="elipse5">
        <img src="images/elipse5.png" alt="" />
      </div>



    </>
  );
};

export default AddPatients;