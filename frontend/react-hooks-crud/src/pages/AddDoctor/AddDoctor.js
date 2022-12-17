import React, { useState } from "react";
import {useNavigate } from 'react-router-dom';
import Header from "../../components/Header/Header";
import DoctorsDataService from "../../services/DoctorService";
import './AddDoctor.scss';

const AddDoctor = () => {
    let navigate = useNavigate();
    const initialDoctorState = {
        id: null,
        collegiateNum: "",
        name: "",
        surname: "",
        secondSurname: "",
        dni: ""
    };

    const [doctor, setDoctor] = useState(initialDoctorState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setDoctor({ ...doctor, [name]: value });
    };

    const saveDoctor = (event) => {
        event.preventDefault();
        console.log(event.target)
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
        navigate("/doctorsList");
    };

    return (
        <>
            <Header />
            <style>{'body {  background-color: var(--background); }'}</style>
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
                         <form onSubmit={saveDoctor} >
                            <div className="form-group">
                                <label htmlFor="collegiateNum">Collegiate number</label>
                                <input
                                    type="text" className="form-control"
                                    id="collegiateNum" required value={doctor.collegiateNum}
                                    onChange={handleInputChange} name="collegiateNum"
                                    minLength={3} maxLength={40}           
                                />                                
                               
                            </div>

                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input
                                    type="text" className="form-control" id="name"
                                    required value={doctor.name} onChange={handleInputChange}
                                    name="name" minLength={3} maxLength={40} 
                                    pattern="[A-ZÄËÏÖÜÁÉÍÓÚÂÊÎÔÛÀÈÌÒÙ][a-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ]+"
                                    
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="surname">Surname:</label>
                                <input
                                    type="text" className="form-control" id="surname" required
                                    value={doctor.surname} onChange={handleInputChange}
                                    name="surname" minLength={3} maxLength={40}
                                    pattern="[A-ZÄËÏÖÜÁÉÍÓÚÂÊÎÔÛÀÈÌÒÙ][a-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ]+"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="secondSurname">Second Surname:</label>
                                <input
                                    type="text" className="form-control" id="secondSurname"
                                    required value={doctor.secondSurname} onChange={handleInputChange}
                                    name="secondSurname" minLength={3} maxLength={40}
                                    pattern="[A-ZÄËÏÖÜÁÉÍÓÚÂÊÎÔÛÀÈÌÒÙ][a-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ]+"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="dni">Dni:</label>
                                <input
                                    type="text" className="form-control"
                                    id="dni" required value={doctor.dni}
                                    onChange={handleInputChange} name="dni"
                                    pattern="^[0-9]{8,8}[A-Za-z]$"   
                                   />
                            </div>
                            <button type="submit" className="btn-submit">
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