
import React, { useState } from 'react';
import * as BiIcons from 'react-icons/bi';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Header.scss';
import { IconContext } from 'react-icons';


function Header() {
  const [sidebar, setSidebar] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: 'none' }}>
        <img src="/images/elipse3.png" className="elipse2" alt="" />
        <div className='navbar' >
          <Link to='#' >
            <BiIcons.BiMenu className='menu-bars' onClick={showSidebar} />
          </Link>
          <img src="/images/logoD.png" className="logo" alt="" />
        </div>

        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return !item.onlyAdmin || user.roles.includes('ROLE_ADMIN') ? (
                <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
              ): null;
            })}
          </ul>
        </nav>
      </IconContext.Provider>

    </>
  );
}

export default Header;