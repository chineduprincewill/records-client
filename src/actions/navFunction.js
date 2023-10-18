import React from 'react'
import { useRecoilState } from 'recoil';
import { system_admin, system_auditor, admin, auditor } from '../components/protected/sidebar/NavDB';
import { ActiveTabState } from '../atoms/ActiveTabState';
import { Link } from 'react-router-dom';

export const generateLinks = (user, role) => {

    let navLinks;

    if(user && user.groupid === 0 && role === 'admin'){
        navLinks = system_admin.map((link) => (
            <NavItem link={link} key={link.id} />
        ))
    }
    else if(user && user.groupid === 0 && role === 'auditor'){
        navLinks = system_auditor.map((link) => (
            <NavItem link={link} key={link.id} />
        ))
    }
    else if(user && user.groupid > 0 && role === 'admin'){
        navLinks = admin.map((link) => (
            <NavItem link={link} key={link.id} />
        ))
    }
    else if(user && user.groupid > 0 && role === 'auditor'){
        navLinks = auditor.map((link) => (
            <NavItem link={link} key={link.id} />
        ))
    }
    
  return navLinks
}



function NavItem ({ link }) {
    
    const [activeNavItem, setActiveNavItem] = useRecoilState(ActiveTabState);

    return(
        <Link 
            to={link.url}
            onClick={() => setActiveNavItem(link.id)}
            className={`w-full flex items-center justify-start space-x-8 px-5 cursor-pointer hover:border-gray-400 border-l-4 border-transparent group ${activeNavItem === link.id && "border-gray-400 bg-white py-3"} text-sm`}
        >
            <span 
                className={`group-hover:text-slate-600 ${activeNavItem === link.id ? "text-gray-700" : "text-white"}`}
            >
                {link.icon}
            </span>
            <h1 
                className={`group-hover:text-slate-600 ${activeNavItem === link.id ? "text-gray-700" : "text-white"}`}
            >
                {link.title}
            </h1>
        </Link>
    )
}