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
    dni: "",
    history: "",
  };
  const [currentPatients, setCurrentPatients] = useState(initialPatientsState);
  const [message, setMessage] = useState("");

  const getPatients = id => {
    PatientsDataService.get(id)
      .then(response => {
        setCurrentPatients(response.data);
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
    setCurrentPatients({ ...currentPatients, [name]: value });
  };


  const updatePatients = () => {
    PatientsDataService.update(currentPatients.id, currentPatients)
      .then(response => {
        console.log(response.data);
        setMessage("The Patient was updated successfully!");
        navigate("/patients");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deletePatients = () => {
    PatientsDataService.remove(currentPatients.id)
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
      <div className="form">

        <div className="cabecera">
          <p className="patient-name">{currentPatients.name}</p>

        </div>

        {currentPatients ? (
          <div>
                <Form >
                  <Row className="mb-3">
                    <Form.Group as={Col} md="4"

                      className="position-relative">

                      <Form.Label> Name</Form.Label>
                      <Form.Control type="text" className="form-control"
                        id="name" name="name" value={currentPatients.name} onChange={handleInputChange} />

                      {/* <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback> */}
                    </Form.Group>

                    <Form.Group as={Col} md="4"
                      className="position-relative">

                      <Form.Label>Surname</Form.Label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        id="surname"
                        name="surname"
                        value={currentPatients.surname}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <Form.Group as={Col} md="4"

                      className="position-relative">

                      <Form.Label>Dni</Form.Label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        id="dni"
                        name="dni"
                        value={currentPatients.dni}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Row>
                  <Form.Group className="position-relative mb-3">
                    <Form.Label>History</Form.Label>
                    <Form.Control
                      type="text"
                      className="form-control-history"
                      id="history"
                      name="history"
                      value={currentPatients.history}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <button className="delete-button" onClick={deletePatients}>
                    <BiIcons.BiTrashAlt />  Delete
                  </button>
                  <p>{message}</p>

                  <button type="submit" className="update-button" onClick={updatePatients} >
                    <BiIcons.BiEditAlt />Update
                  </button>
                  <p>{message}</p>
                </Form>    
          </div> 
       
  ) : (
    <div>
      <br />
    </div>
  )
}
        
      </div >

    </>
  );
};

export default Patients;