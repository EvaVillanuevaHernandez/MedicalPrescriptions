import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as FiIcons from 'react-icons/fi';
import * as IoIcons from 'react-icons/io';
import * as CgIcons from 'react-icons/cg';

export const SidebarData = [
  {
    title: 'Patients',
    path: '/patients',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
    
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: <CgIcons.CgProfile />,
    cName: 'nav-text'
  },
  {
    title: 'Prescriptions',
    path: '/prescriptionsList',
    icon: <FaIcons.FaPrescriptionBottleAlt />,
    cName: 'nav-text'
  },
  {
    title: 'Settings',
    path: '/setting',
    icon: <FiIcons.FiSettings />,
    cName: 'nav-text'
  },
  {
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  }
];