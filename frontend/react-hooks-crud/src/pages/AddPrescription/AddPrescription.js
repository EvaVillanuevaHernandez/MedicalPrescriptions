import React, { useState } from "react";
import Header from "../../components/Header/Header";
import PrescriptionsDataService from "../../services/PrescriptionsService";


const AddPrescription = () => {
  const initialPrescriptionState = {
    id: null,
    patientName: "",
    doctorName: "",
    posology: "",
    date: "",
    medicine: ""
  };

  const [prescription, setPrescriptions] = useState(initialPrescriptionState);
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
    setPrescriptions({ ...prescription, [name]: value });
  };

  const savePrescription = () => {
    var data = {
      patientName: prescription.patientName,
      doctorName: prescription.doctorName,
      posology: prescription.posology,
      date: prescription.date,
      medicine: prescription.medicine
    };

    PrescriptionsDataService.create(data)
      .then(response => {
        setPrescriptions({
          id: response.data.id,
          patientName: response.data.patientName,
          doctorName: response.data.doctorName,
          posology: response.data.posology,
          date: response.data.date,
          medicine: response.data.medicine,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newPrescription = () => {
    setPrescriptions(initialPrescriptionState);
    setSubmitted(false);
  };


  return (
    <>
      <Header />
      <style>{'body { background-color: #DEE7E5 ; }'}</style>
      <div className="add-form" >
        {submitted ? (
          <div className="add">
            <button className="btn-add" onClick={newPrescription} >
              Add
            </button>
            <h4 className="add">You submitted successfully, click add to finish!</h4>
          </div>
        ) : (

          <div className="container">
            <form>
              <div className="form-group">
                <label htmlFor="patientName">Name:</label>
                <input type="text" className="form-control" id="patientName"
                  required value={prescription.patientName} onChange={handleInputChange} name="patientName"
                  minLength={3} maxLength={40}  validations= {[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="doctorName">Doctor:</label>
                <input type="text" className="form-control" id="doctorName"
                  required value={prescription.doctorName} onChange={handleInputChange} name="doctorName"
                  minLength={3} maxLength={40}  validations= {[required]} />
              </div>

              <div className="form-group">
                <label htmlFor="posology">Posology:</label>
                <input type="text" className="form-control" id="posology"
                  requiredvalue={prescription.posology} onChange={handleInputChange} name="posology"
                  minLength={3} maxLength={40}  validations= {[required]} />
              </div>

              <div className="form-group">
                <label htmlFor="date">date:</label>
                <input type="text" className="form-control" id="date"
                  requiredvalue={prescription.date} onChange={handleInputChange} name="date"
                  minLength={3} maxLength={40}  validations= {[required]} />
              </div>

              <div className="form-group">
                <label htmlFor="medicine">Medicine:</label>
                <input type="text" className="form-control" id="medicine"
                  required value={prescription.medicine} onChange={handleInputChange} name="medicine"
                  minLength={3} maxLength={40}  validations= {[required]} />
              </div>

            </form>
            <button onClick={savePrescription} className="btn-submit">
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

export default AddPrescription;