import React, { useState, useEffect } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import swal from 'sweetalert';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from 'react-router-dom';
import DoctorsDataService from "../../services/DoctorService";
import Header from "../../components/Header/Header";
import * as BiIcons from 'react-icons/bi';

import './Doctors.scss';

const Doctors = props => {
    const { id } = useParams();
    let navigate = useNavigate();

    const initialDoctorsState = {
        id: null,
        collegiateNum: "",
        name: "",
        surname: "",
        secondSurname: "",
        dni: ""
    };
    const [currentDoctor, setCurrentDoctor] = useState(initialDoctorsState);


    const getDoctors = id => {
        DoctorsDataService.get(id)
            .then(response => {
                setCurrentDoctor(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        if (id)
            getDoctors(id);
    }, [id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentDoctor({ ...currentDoctor, [name]: value });
    };


    const updateDoctor = (event) => {
        event.preventDefault();
        let datitos = event.target;

        let updateDoctor = {
            id: currentDoctor.id,
            collegiateNum: datitos["collegiateNum"].value,
            name: datitos["name"].value,
            surname: datitos["surname"].value,
            secondSurname: datitos["secondSurname"].value,
            dni: datitos["dni"].value
        }

        DoctorsDataService.update(updateDoctor.id, updateDoctor)
            .then(response => {
                console.log(response.data);
                updateAlert();
                navigate("/doctorsList");

            })
            .catch(e => {

                console.log(e);
            });
    };

    const deleteDoctor = () => {
        DoctorsDataService.remove(currentDoctor.id)
            .then(response => {
                console.log(response.data);
                deleteAlert();
                navigate("/doctorsList");
            })
            .catch(e => {
                console.log(e);
            });
    };


    const updateAlert = () => {
        swal({
            title: "Update",
            text: "The doctor was updated successfully!",
            icon: "success",

        })
    };

    const deleteAlert = () => {
        swal({
            title:"Delete",
            text: "The doctor was deleted successfully!",
            icon: "success",

        })

    };


    return (
        <>
            <Header />
            <style>{'body {  background-color: var(--background); }'}</style>
            <div className="cabecera">
                <p className="doctor-name">{`${currentDoctor.name} ${currentDoctor.surname}`}</p>
            </div>

            <div className="form-d">
                <div>
                    <Form onSubmit={updateDoctor}>
                        <div className="container-d">
                            <Row className="mb-3">

                                <Form.Group as={Col} md="4"
                                    className="position-relative">
                                    <Form.Label> Name:</Form.Label>
                                    <Form.Control type="text"
                                        className="form-control"
                                        id="name" name="name"
                                        value={currentDoctor.name}
                                        onChange={handleInputChange} 
                                        required 
                                        pattern="[A-ZÄËÏÖÜÁÉÍÓÚÂÊÎÔÛÀÈÌÒÙ][a-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ]+"/>
                                </Form.Group>

                                <Form.Group as={Col} md="4"
                                    className="position-relative">

                                    <Form.Label>Surname:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className="form-control"
                                        id="surname"
                                        name="surname"
                                        value={currentDoctor.surname}
                                        onChange={handleInputChange}
                                        required 
                                        pattern="[A-ZÄËÏÖÜÁÉÍÓÚÂÊÎÔÛÀÈÌÒÙ][a-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ]+"/> 
                                </Form.Group>
                            </Row>
                            <Form.Group as={Col} md="4"
                                className="position-relative">

                                <Form.Label>Second surname:</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    id="secondSurname"
                                    name="secondSurname"
                                    value={currentDoctor.secondSurname}
                                    onChange={handleInputChange} 
                                    required 
                                    pattern="[A-ZÄËÏÖÜÁÉÍÓÚÂÊÎÔÛÀÈÌÒÙ][a-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ]+"/> 
                            </Form.Group>


                            <Form.Group as={Col} md="4"
                                className="position-relative">

                                <Form.Label>Dni:</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    id="dni"
                                    name="dni"
                                    value={currentDoctor.dni}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            <Form.Group className="position-relative mb-3">
                                <Form.Label>Collegiate number:</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    id="collegiateNum"
                                    name="collegiateNum"
                                    value={currentDoctor.collegiateNum}
                                    onChange={handleInputChange}             
                                />
                            </Form.Group>

                        </div>

                        <button type="submit" className="update-button" >
                            <BiIcons.BiEditAlt />Update
                        </button>
                    </Form>
                    
                    <button className="delete-button" onClick={deleteDoctor}>
                            <BiIcons.BiTrashAlt /> Delete
                        </button>
                </div>
            </div >
        </>
    );
};

export default Doctors;