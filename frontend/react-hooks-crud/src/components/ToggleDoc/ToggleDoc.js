import React, {useState} from 'react';
import { Link } from "react-router-dom";
import * as FaIcons from 'react-icons/fa';
import './ToggleDoc.scss';

const GroupItem = ({active, text,  index, currentDoctor})=> {

    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className={"group-item-doc " + (active ? "active" : "")} onClick={() => setIsOpen(!isOpen)} key={index}>
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
                      {currentDoctor.name}
                    </div>
                    <div>
                      <label>
                        <strong>Surname:</strong>
                      </label>{" "}
                      {currentDoctor.surname}
                    </div>
                    <div>
                      <label>
                        <strong>Second surname:</strong>
                      </label>{" "}
                      {currentDoctor.secondSurname}
                    </div>
                    <div>
                      <label>
                        <strong>Dni:</strong>
                      </label>{" "}
                      {currentDoctor.dni}
                    </div>

                    <div>
                      <label>
                        <strong>Collegiate number:</strong>
                      </label>{" "}
                      {currentDoctor.collegiateNum}
                    </div>

                    <div className="edit">
                      <Link
                        to={"/doctors/" + currentDoctor.id}>
                        Edit
                      </Link>
                    </div>
                  </div>
                ) : null}
        </div>
    );

}
export default GroupItem;