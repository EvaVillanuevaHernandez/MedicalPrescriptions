import React, {useState} from 'react';
import { Link } from "react-router-dom";
import * as FaIcons from 'react-icons/fa';
import './TogglePat.scss';

const GroupItem = ({active, text,  index, patient})=> {

    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className={"group-item-pat " + (active ? "active" : "")} onClick={() => setIsOpen(!isOpen)} key={index}>
            <div>
                <label className="label">
                    <h5>{text}</h5>
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
                    {patient.name}
                  </div>
                  <div>
                    <label>
                      <strong>Surname:</strong>
                    </label>{" "}
                    {patient.surname}
                  </div>
                  <div>
                    <label>
                      <strong>Second surname:</strong>
                    </label>{" "}
                    {patient.secondSurname}
                  </div>
                  <div>
                    <label>
                      <strong>Dni:</strong>
                    </label>{" "}
                    {patient.dni}
                  </div>

                  <div>
                    <label>
                      <strong>History:</strong>
                    </label>{" "}
                    {patient.history}
                  </div>
                  
                  <div className="edit">
                    <Link
                      to={"/patients/" + patient.id}>
                        Edit 
                    </Link>
                  </div>          
                </div>
              ) : null}
        </div>
    );

}
export default GroupItem;