import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import PrescriptionsDataService from "../../services/PrescriptionsService";
import Header from "../../components/Header/Header";

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
        navigate("/prescriptions");
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
        navigate("/prescriptions");
      })
      .catch(e => {
        console.log(e);
      });
  };

    return (
      <>
      <Header/>
      <div>
        {currentPrescriptions ? (
          <div className="edit-form">
            <h4>Prescriptions</h4>
            <form>
              <div className="form-group">
                <label htmlFor="patientName">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="patientName"
                  name="patientName"
                  value={currentPrescriptions.patientName}
                  onChange={handleInputChange}
                />
              </div>
             
              <div className="form-group">
                <label htmlFor="doctorName">Doctor</label>
                <input
                  type="text"
                  className="form-control"
                  id="doctorName"
                  name="doctorName"
                  value={currentPrescriptions.doctorName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="text"
                  className="form-control"
                  id="date"
                  name="date"
                  value={currentPrescriptions.date}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="medicine">Medicine</label>
                <input
                  type="text"
                  className="form-control"
                  id="medicine"
                  name="medicine"
                  value={currentPrescriptions.medicine}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="posology">Posology</label>
                <input
                  type="text"
                  className="form-control"
                  id="posology"
                  name="posology"
                  value={currentPrescriptions.posology}
                  onChange={handleInputChange}
                />
              </div>

  
            </form>
  
            <button className="badge badge-danger mr-2" onClick={deletePrescriptions}>
              Delete
            </button>
  
            <button
              type="submit"
              className="badge badge-success"
              onClick={updatePrescriptions}
            >
              Update
            </button>
            <p>{message}</p>
          </div>
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