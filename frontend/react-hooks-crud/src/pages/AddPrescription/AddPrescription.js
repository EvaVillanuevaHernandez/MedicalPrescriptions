import React, { useState,useEffect } from "react";
import Header from "../../components/Header/Header";
import { IconContext } from 'react-icons';
import PrescriptionsDataService from "../../services/PrescriptionsService";
import { useNavigate } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import './AddPrescription.scss';
import PatientDataService from "../../services/PatientService";
import DoctorDataService from "../../services/DoctorService";

const AddPrescription = () => {
  let navigate = useNavigate();

  const initialPrescriptionState = {
    id: null,
    patient: "",
    doctor: "",
    posology: "",
    date: "",
    medicine: ""
  };

  const [prescription, setPrescriptions] = useState(initialPrescriptionState);
  const [submitted, setSubmitted] = useState(false);
  const [patient, setPatient] = useState([]);
  const [doctor, setDoctor] = useState([]);
 
  
  useEffect(() => {
    retrievePatient();
  }, []);

  const retrievePatient = () => {
    PatientDataService.getAll()
   
      .then(response => {
        setPatient(response.data);
        console.log("Pacientes",response.data);     
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
        console.log("doctores",response.data);     
      })
      .catch(e => {
        console.log(e);
      })
  };


  const handleSelectChange = event => { 
    setPrescriptions({ ...prescription, doctor:event.target.value });
     console.log("value",doctor)
  };

  const handleSelectChangeP = event => { 
    setPrescriptions({ ...prescription, patient:event.target.value });
 
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setPrescriptions({ ...prescription, [name]: value });
  };

  const savePrescription = (event) => {
    event.preventDefault();
    var data = {
      patient: prescription.patient,
      doctor: prescription.doctor,
      posology: prescription.posology,
      date: prescription.date,
      medicine: prescription.medicine
      
    };

    PrescriptionsDataService.create(data)
      .then(response => {      
          setPrescriptions({
            id: response.data.id,
            patient: response.data,
            doctor: response.data,
            posology:response.data.posology,
            date: response.data.date,
            medicine: response.data.medicine,
          });
          setSubmitted(true);
          console.log(response.data);
        }).catch(e => {
          console.log(e);
        });

  };

  const newPrescription = () => {
    setPrescriptions(initialPrescriptionState);
    setSubmitted(false);
    navigate("/prescriptionsList");
  };
 
  return (
    <>
      <Header />
      <style>{'body {  background-color: var(--background); }'}</style>
      <IconContext.Provider value={{ color: '#231F20' }}>
        <div className="add-form" >
          {submitted ? (
            <div className="add">
              <button className="btn-add" onClick={newPrescription} >
                Add
              </button>
              <h4 className="add">You submitted successfully, click add to finish!</h4>
            </div>
          ) : (

            <div className="container-addPr">
              <form onSubmit={savePrescription}>
                <div className="form-group">
                  <label htmlFor="patientName">Name:</label>
                  <select required id="patient" name="patient" onChange={handleSelectChangeP} className="form-control" >
                  <option value="">- -</option>
                    {patient.map((patient, index) => (
                      <option key={index}  value={patient.id}>{patient.name}</option>     
                    ))}
                   
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="doctorName">Doctor:</label>
                  <select required id="doctor" name="doctor" onChange={handleSelectChange} className="form-control ">
                  <option> - - </option>
                    {doctor.map((doctor, index) => (                   
                      <option key={index}  value={doctor.id}>{doctor.name}</option>                     
                    ))}
                   
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="posology">Posology:</label>
                  <input type="text" className="form-control" id="posology"
                    required value={prescription.posology} onChange={handleInputChange} name="posology"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="date">Date:</label>
                  <input type="text" className="form-control" id="date"
                    required value={prescription.date} onChange={handleInputChange} name="date"
                    minLength={3} maxLength={40}
                    pattern="^(19|20)(((([02468][048])|([13579][26]))-02-29)|(\d{2})-((02-((0[1-9])|1\d|2[0-8]))|((((0[13456789])|1[012]))-((0[1-9])|((1|2)\d)|30))|(((0[13578])|(1[02]))-31)))$"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="medicine">Medicine:</label> <a href="https://www.vademecum.com/medicamentos/" target="_blank" rel="noreferrer" ><AiIcons.AiOutlineInfoCircle /></a>
                  <input type="text" className="form-control" id="medicine"
                    required value={prescription.medicine} onChange={handleInputChange} name="medicine"
                    minLength={3} maxLength={40}
                    pattern="[A-ZÄËÏÖÜÁÉÍÓÚÂÊÎÔÛÀÈÌÒÙ][a-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ]+"/>
                </div>
                <button type="submit" className="btn-submit">
                  Submit
                </button>

              </form>

            </div>
          )}
        </div>
      </IconContext.Provider>
      <div id="elipse5">
        <img src="images/elipse5.png" alt="" />
      </div>

    </>
  );
};

export default AddPrescription;