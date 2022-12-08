import React, { useState, useEffect } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

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
    typeImage: ""
  };
  const [currentPatient, setCurrentPatient] = useState(initialPatientsState);
  const [message, setMessage] = useState("");

  const getPatients = id => {
    PatientsDataService.get(id)
      .then(response => {
        setCurrentPatient(response.data);

        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getPatients(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentPatient({ ...currentPatient, [name]: value });
  };


  const updatePatient = (event) => {
    event.preventDefault();
    console.log("hola holita caracolita")
    let datitos = event.target;

    let updatedPatient = {
      id: currentPatient.id,
      name: datitos["name"].value,
      surname: datitos["surname"].value,
      secondSurname: datitos["secondSurname"].value,
      dni: datitos["dni"].value,
      history: datitos["history"].value,
      image: currentPatient.image,
      typeImage: currentPatient.typeImage
    }

    PatientsDataService.update(updatedPatient.id, updatedPatient)
      .then(response => {
        console.log(response.data);
        setMessage("The Patient was updated successfully!");

        navigate("/patients");

      })
      .catch(e => {

        console.log(e);
      });
  };

  const deletePatient = () => {
    PatientsDataService.remove(currentPatient.id)
      .then(response => {
        console.log(response.data);
        setMessage("The Patient was deleted successfully!");
        navigate("/patients");
      })
      .catch(e => {
        console.log(e);
      });
  };


  return (
    <>
      <Header />
      <style>{'body { background-color: #DEE7E5 ; }'}</style>
      <div className="cabecera">
        <p className="patient-name">{currentPatient.name}</p>
      </div>

      <div className="form-p">
        {currentPatient ? (
          <div>
            <Form onSubmit={updatePatient}>
              <div className="container-p">
                <Row className="mb-3">
                  <Form.Group as={Col} md="4">
                    <img src={`data:${currentPatient.typeImage};base64,${currentPatient.image}`}
                      alt=" " className="patient-image" onChange={handleInputChange} />
                  </Form.Group>

                  <Form.Group as={Col} md="4"
                    className="position-relative">
                    <Form.Label> Name:</Form.Label>
                    <Form.Control type="text"
                      className="form-control"
                      id="name" name="name"
                      value={currentPatient.name}
                      onChange={handleInputChange} />
                  </Form.Group>
                  <Form.Group as={Col} md="4"
                    className="position-relative">

                    <Form.Label>Surname:</Form.Label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      id="surname"
                      name="surname"
                      value={currentPatient.surname}
                      onChange={handleInputChange} />
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
                    onChange={handleInputChange} />
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
                    onChange={handleInputChange}
                  />
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
                    onChange={handleInputChange}
                  />
                </Form.Group>

              </div>


              <button className="delete-button" onClick={deletePatient}>
                <BiIcons.BiTrashAlt /> Delete
              </button>
              <p>{message}</p>

              <button type="submit" className="update-button" >

                {/* onClick={updatePatient} */}
                <BiIcons.BiEditAlt />Update
              </button>
              <p>{message}</p>
            </Form>
          </div>
        ) : (
          <div id="elipse5">
            <img src="/images/elipse5.png" alt="" />
          </div>
        )
        }
      </div >

    </>
  );
};

export default Patients;