import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
const PrescriptionsInfo = () => {
    const [currentPrescriptions, setCurrentPrescriptions] = useState(null);
return (
    <>
        <div className="col-md-6">
            {currentPrescriptions ? (
                <div>
                    <div>
                        <label>
                            <strong>Name:</strong>
                        </label>{" "}
                        {currentPrescriptions.patientName}
                    </div>
                    <div>
                        <label>
                            <strong>Doctor:</strong>
                        </label>{" "}
                        {currentPrescriptions.doctorName}
                    </div>
                    <div>
                        <label>
                            <strong>Date:</strong>
                        </label>{" "}
                        {currentPrescriptions.date}
                    </div>
                    <div>
                        <label>
                            <strong>Medicine:</strong>
                        </label>{" "}
                        {currentPrescriptions.medicine}
                    </div>
                    <div>
                        <label>
                            <strong>Posology:</strong>
                        </label>{" "}
                        {currentPrescriptions.posology}
                    </div>

                    <Link className="edit"
                        to={"/prescriptions/" + currentPrescriptions.id}
                    >
                        <FaIcons.FaEdit />
                    </Link>

                </div>
            ) : (
                <></>
              )}

            </div> 
          
     
    </>
);
            };
            export default PrescriptionsInfo;