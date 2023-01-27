import React from "react";
import './Settings.scss';
import Footer from "../../components/Footer/Footer";
import HeaderLogin from "../../components/Header/HeaderLogin";
import HeaderSett from "../../components/Header/HeaderSett";
import * as GiIcons from 'react-icons/gi';
import * as GrIcons from 'react-icons/gr';
import  Switch  from "../../components/Switch/Switch";


function Settings() {
    return (
        <>
            <HeaderLogin />
            <HeaderSett />
            <style>{'body {  background-color: var(--background); }'}</style>

            <img src="images/logo.png" alt="logo" className="logo-set" />

            <div className="help">
            <a href="/help"> <GiIcons.GiHelp/> Help </a>          
            </div>

            <div className="LogOut">
            <a href="/login"> <GrIcons.GrLogout/> Log out </a>          
            </div>

            <div className="LogOut">            
            <Switch></Switch>
            </div>

            <p className="version"> Versión de la aplicación 1.0</p>  


            <div id="elipse-4">
                <img src="images/elipse4.png" alt="elipse4" />
            </div>

            <Footer/>
        </>
       
    );


}
export default Settings;