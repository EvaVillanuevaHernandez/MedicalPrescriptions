import React from 'react';
import './NavBar.scss'
import * as BsIcons from 'react-icons/bs';
function NavBar() {


    return (
        <>
          <style>{'body { background-color: #7994A6 ; }'}</style>
            <nav className='navbar'>
                <div className="container-fluid">                   
                    <img src="/images/logoD.png" className="logo" alt="" />                 
                   
                    <ul className="nav navbar-nav">
                        <a href="/login"  ><BsIcons.BsPersonFill className="login-home"/>  </a>    
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default NavBar;