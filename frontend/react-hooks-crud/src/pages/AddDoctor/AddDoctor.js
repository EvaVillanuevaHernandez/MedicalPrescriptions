import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import DoctorsDataService from "../../services/DoctorService";
import './AddDoctor.scss';

const AddDoctor = () => {
    const initialDoctorState = {
        id: null,
        collegiateNum: "",
        name: "",
        surname: "",
        secondSurname: "",
        dni: ""
    };

    const required = (value) => {
        if (!value) {
          return (
            <div className="alert alert-danger" role="alert">
              This field is required!
            </div>
          );
        }
      };
    const [doctor, setDoctor] = useState(initialDoctorState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setDoctor({ ...doctor, [name]: value });
    };

    const saveDoctor = () => {
        var data = {
            collegiateNum: doctor.collegiateNum,
            name: doctor.name,
            secondSurname: doctor.secondSurname,
            dni: doctor.dni
        };

        DoctorsDataService.create(data)
            .then(response => {
                setDoctor({
                    id: response.data.id,
                    collegiateNum: response.data.collegiateNum,
                    name: response.data.name,
                    secondSurname: response.data.secondSurname,
                    dni: response.data.dni
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newDoctor = () => {
        setDoctor(initialDoctorState);
        setSubmitted(false);
        Navigate("/doctors");
    };

    return (
        <>
            <Header />
            <style>{'body { background-color: #DEE7E5 ; }'}</style>
            <div className="submit-form">
                {submitted ? (
                    <div className="add">
                        <h4>You submitted successfully, click add to finish!</h4>
                        <button className="btn-add" onClick={newDoctor}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div className="form-container">
                        <form>
                            <div className="form-group">
                                <label htmlFor="collegiateNum">Collegiate number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="collegiateNum"
                                    required
                                    value={doctor.collegiateNum}
                                    onChange={handleInputChange}
                                    name="collegiateNum"
                                    minLength={3} maxLength={40}
                                     validations= {[required]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    required
                                    value={doctor.name}
                                    onChange={handleInputChange}
                                    name="name"
                                    minLength={3} maxLength={40}
                                     validations= {[required]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="surname">First Surname:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="surname"
                                    required
                                    value={doctor.surname}
                                    onChange={handleInputChange}
                                    name="surname"
                                    minLength={3} maxLength={40}
                                     validations= {[required]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="secondSurname">Second Surname:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="secondSurname"
                                    required
                                    value={doctor.secondSurname}
                                    onChange={handleInputChange}
                                    name="secondSurname"
                                    minLength={3} maxLength={40} 
                                    validations= {[required]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="dni">Dni:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="dni"
                                    required
                                    value={doctor.dni}
                                    onChange={handleInputChange}
                                    name="dni"
                                    minLength={3} maxLength={40}
                                     validations= {[required]}
                                />
                            </div>

                            <button onClick={saveDoctor} className="btn-submit">
                                Submit
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
};

export default AddDoctor;