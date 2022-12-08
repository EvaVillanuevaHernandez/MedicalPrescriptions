import React from 'react';
import { Link } from "react-router-dom";
import * as FaIcons from 'react-icons/fa';
import './GroupItem.scss';
const GroupItem = ({active, text, action, index})=> {

    return (
        <div className={"group-item " + (active ? "active" : "")} onClick={() => action()} key={index}>
            <div>
                <label className="label">
                    <strong>{text}</strong>
                </label>{" "}
                <Link className="eye">
                    <FaIcons.FaEye />
                </Link>
            </div>
        </div>
    );

}
export default GroupItem;