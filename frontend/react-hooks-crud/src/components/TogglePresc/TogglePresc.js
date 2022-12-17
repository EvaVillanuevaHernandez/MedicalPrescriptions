import React, {useState} from 'react';
import { Link } from "react-router-dom";
import * as FaIcons from 'react-icons/fa';
import './TogglePresc.scss';

const GroupItem = ({active, text, index, currentPrescriptions})=> {

    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className={"group-item " + (active ? "active" : "")} onClick={() => setIsOpen(!isOpen)} key={index}>
            <div>
                <label className="label">
                    <strong>{text}</strong>
                </label>{" "}
                <Link className="eye">
                    <FaIcons.FaEye />
                </Link>
            </div>
            {isOpen ? (
                <div>
                  <div>
                    <label>
                      <strong>Name:</strong>
                    </label>{" "}
                    {currentPrescriptions.patient.name}
                  </div>
                  <div>
                    <label>
                      <strong>Doctor:</strong>
                    </label>{" "}
                    {currentPrescriptions.doctor.name}
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
                  > Edit
                  </Link>

                </div>
              ) : null}
        </div>
    );

}
export default GroupItem;