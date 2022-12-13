import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as FiIcons from 'react-icons/fi';
import * as IoIcons from 'react-icons/io';
import * as CgIcons from 'react-icons/cg';

export const SidebarData = [
  {
    title: 'Patients',
    path: '/patientsList',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
    
  },
  {
    title: 'Doctors',
    path: '/doctorsList',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text',
    onlyAdmin: true
    
  },
  {
    title: 'Prescriptions',
    path: '/prescriptionsList',
    icon: <FaIcons.FaPrescriptionBottleAlt />,
    cName: 'nav-text'
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: <CgIcons.CgProfile />,
    cName: 'nav-text'
  },
 
  {
    title: 'Settings',
    path: '/settings',
    icon: <FiIcons.FiSettings />,
    cName: 'nav-text'
  },
  {
    title: 'New user',
    path: '/register',
    icon: <AiIcons.AiOutlineUserAdd />,
    cName: 'nav-text',
    onlyAdmin: true
  },
  {
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
    
  }
];