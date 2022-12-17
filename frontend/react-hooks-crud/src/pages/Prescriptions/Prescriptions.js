import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import swal from 'sweetalert';
import PrescriptionsDataService from "../../services/PrescriptionsService";
import PatientDataService from "../../services/PatientService";
import DoctorDataService from "../../services/DoctorService";
import Header from "../../components/Header/Header";
import * as BiIcons from 'react-icons/bi';
import './Prescriptions.scss';

const Prescriptions = props => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialPrescriptionsState = {
    id: null,
    patient: "",
    doctor: "",
    date: "",
    medicine: "",
    posology: ""
  };
  const [currentPrescriptions, setCurrentPrescriptions] = useState(initialPrescriptionsState);
  const [patient, setPatient] = useState([]);
  const [doctor, setDoctor] = useState([]);


  useEffect(() => {
    retrievePatient();
  }, []);

  const retrievePatient = () => {
    PatientDataService.getAll()

      .then(response => {
        setPatient(response.data);
      })
      .catch(e => {
        console.log(e);
      })
  };

  useEffect(() => {
    retrieveDoctor();
  }, []);


  const retrieveDoctor = () => {
    DoctorDataService.getAll()

      .then(response => {
        setDoctor(response.data);
      })
      .catch(e => {
        console.log(e);
      })
  };

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

  const handleSelectChangeP = event => {
    setCurrentPrescriptions({ ...currentPrescriptions, patient: event.target.value });
  };

  const handleSelectChangeD = event => {
    setCurrentPrescriptions({ ...currentPrescriptions, doctor: event.target.value });
  };

  const updatePrescriptions = (event) => {
    event.preventDefault();
    console.log(currentPrescriptions)
    let datitos = event.target;
    let updatePrescriptions = {
      id: currentPrescriptions.id,
      patient: datitos["patient"].value,
      doctor: datitos["doctor"].value,
      date: datitos["date"].value,
      medicine: datitos["medicine"].value,
      posology: datitos["posology"].value,

    }

    PrescriptionsDataService.update(updatePrescriptions.id, updatePrescriptions)
      .then(response => {
        console.log(response.data);
        updateAlert();
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
        deleteAlert();
        navigate("/prescriptionsList");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateAlert = () => {
    swal({
      title: "update",
      text: "The prescriptions was updated successfully!",
      icon: "success",

    })

  };

  const deleteAlert = () => {
    swal({
      title: "delete",
      text: "The prescriptions was deleted successfully!",
      icon: "success",

    })

  };

  return (
    <>
      <Header />
      <style>{'body {  background-color: var(--background); }'}</style>
      <div className="form-prescriptions">
        <>
          <div>
            <Form onSubmit={updatePrescriptions} >
              <div className="container-pr">
                <Row className="mb-3">
                  <Form.Group as={Col} md="4"
                    className="position-relative">
                    <Form.Label> Name:</Form.Label>
                    <select id="patient" name="patient"
                      onChange={handleSelectChangeP}
                      className="form-control" required>
                        <option>- -</option>
                      {patient.map((patient, index) => (                    
                        <option key={index} value={patient.id}>{patient.name} </option>
                      ))}
                    </select>

                  </Form.Group>
                  <Form.Group as={Col} md="4"
                    className="position-relative">

                    <Form.Label>Doctor:</Form.Label>
                    <select id="doctor" name="doctor"
                      onChange={handleSelectChangeD}
                      className="form-control"
                      required>
                        <option>- -</option>
                      {doctor.map((doctor, index) => (
                        <option key={index} value={doctor.id}>{doctor.name}</option>
                      ))}
                    </select>
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
                        required 
                        onChange={handleInputChange} 
                        pattern="^(19|20)(((([02468][048])|([13579][26]))-02-29)|(\d{2})-((02-((0[1-9])|1\d|2[0-8]))|((((0[13456789])|1[012]))-((0[1-9])|((1|2)\d)|30))|(((0[13578])|(1[02]))-31)))$"
                        />
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
                        required
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
                      required
                    />
                  </Form.Group>
              </div>

              <button type="submit" className="update-button" >
                <BiIcons.BiEditAlt />Update
              </button>
            </Form>

            <button className="delete-button" onClick={deletePrescriptions}>
              <BiIcons.BiTrashAlt />  Delete
            </button>
          </div>
        </>
      </div>
    </>
  );
};

export default Prescriptions;