import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import PrescriptionsDataService from "../../services/PrescriptionsService";
import Header from "../../components/Header/Header";
import * as BiIcons from 'react-icons/bi';
import './Prescriptions.scss';

const Prescriptions = props => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialPrescriptionsState = {
    id: null,
    patientName: "",
    doctorName: "",
    date: "",
    medicine: "",
    posology:""
  };
  const [currentPrescriptions, setCurrentPrescriptions] = useState(initialPrescriptionsState);
  const [message, setMessage] = useState("");

  const getPrescriptions = id => {
    PrescriptionsDataService.get(id)
      .then(response => {
        setCurrentPrescriptions(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getPrescriptions(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentPrescriptions({ ...currentPrescriptions, [name]: value });
  };


  const updatePrescriptions = () => {
    PrescriptionsDataService.update(currentPrescriptions.id, currentPrescriptions)
      .then(response => {
        console.log(response.data);
        setMessage("The Prescriptions was updated successfully!");
        navigate("/prescriptionsList");
      })
      .catch(e => {
        console.log(e);
      });
  };



  const deletePrescriptions = () => {
    PrescriptionsDataService.remove(currentPrescriptions.id)
      .then(response => {
        console.log(response.data);
        setMessage("The Prescriptions was deleted successfully!");
        navigate("/prescriptionsList");
      })
      .catch(e => {
        console.log(e);
      });
  };

    return (
      <>
      <Header/>
      <style>{'body { background-color: #DEE7E5 ; }'}</style>
      <div className="form-prescriptions">
        {currentPrescriptions ? (
          <Form >
          <div className="container-pr">
            <Row className="mb-3">
              <Form.Group as={Col} md="4"
                className="position-relative">
                <Form.Label> Name:</Form.Label>
                <Form.Control type="text"
                  className="form-control-prescriptions"
                  id="patientName"
                  name="patientName"
                  value={currentPrescriptions.patientName}
                  onChange={handleInputChange}/>

              </Form.Group>

              <Form.Group as={Col} md="4"
                className="position-relative">

                <Form.Label>Doctor:</Form.Label>
                <Form.Control
                 type="text"
                 className="form-control-prescriptions"
                 id="doctorName"
                 name="doctorName"
                 value={currentPrescriptions.doctorName}
                 onChange={handleInputChange}/>
              </Form.Group>
              </Row>

              <Row className="mb-3">
              <Form.Group as={Col} md="4"
                className="position-relative">

                <Form.Label>Date:</Form.Label>
                <Form.Control
                type="text"
                className="form-control-prescriptions"
                id="date"
                name="date"
                value={currentPrescriptions.date}
                onChange={handleInputChange}/>
              </Form.Group>
           

            <Form.Group as={Col} md="4"
              className="position-relative">

              <Form.Label>Medicine:</Form.Label>
              <Form.Control
               type="text"
               className="form-control-prescriptions"
               id="medicine"
               name="medicine"
               value={currentPrescriptions.medicine}
               onChange={handleInputChange}
              />
            </Form.Group>
            </Row>

            <Form.Group className="position-relative mb-3">
              <Form.Label>Posology:</Form.Label>
              <Form.Control
                 type="text"
                 className="form-control-posology"
                 id="posology"
                 name="posology"
                 value={currentPrescriptions.posology}
                 onChange={handleInputChange}
              />
            </Form.Group> 
          </div>   
                
          <button className="delete-button" onClick={deletePrescriptions}>
                <BiIcons.BiTrashAlt />  Delete
              </button>
              <p>{message}</p>

              <button type="submit" className="update-button" onClick={updatePrescriptions} 
              >
                <BiIcons.BiEditAlt />Update
                <p>{message}</p>
              </button>                  
        </Form>
        ) : (
          <div>
            <br />
          </div>
        )}
      </div>
      </>
    );
  };

export default Prescriptions;