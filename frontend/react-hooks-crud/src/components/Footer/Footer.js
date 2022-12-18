import React from 'react';
import{Link} from 'react-router-dom';
import './Footer.scss';
import * as FiIcons from 'react-icons/fi';
import * as AiIcons from 'react-icons/ai';
function Footer() {
    return(
<div>
    <footer className='footer'>
        <div className='container-f'>
            <nav className="row justify-content-md-center">
                <Link to= '/prescriptionsList' className="col col-lg-2">
                <a>Prescriptions</a>
                </Link>
                <Link to= '/pacientsList' className="col col-lg-2">
                <a>Patients</a>
                </Link>
                <Link to= '/doctorsList' className="col col-lg-2">
                <a>Doctors</a>
                </Link>
                <Link to= '/' className="col col-lg-2">
                <FiIcons.FiTwitter></FiIcons.FiTwitter>
                <FiIcons.FiFacebook></FiIcons.FiFacebook>
                <AiIcons.AiOutlineWhatsApp></AiIcons.AiOutlineWhatsApp>
                </Link>
            </nav>
        </div>
    </footer>
</div>
    );

}
export default Footer;