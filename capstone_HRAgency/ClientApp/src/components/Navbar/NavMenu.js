import React from "react";
// import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from "reactstrap";
//import { AdminDropDownMenu } from "../../components/DropDownMenu";
import {  Link,NavLink } from "react-router-dom";
import { LoginMenu } from "../api-authorization/LoginMenu";
//import useDropdownMenu from 'react-accessible-dropdown-menu-hook';

import "./NavMenu.css";

export const NavMenu = () => {
	return (
		<header className="navbar">
			<nav className="flex-center nav-container">
				<div>
					 <a href="https://www.thehragency.ca/">
					   <img alt="Go Back to Home Page" src="./images/Logo.png"></img> 
					 </a>

					{/*<Link to="https://www.thehragency.ca/">
						<img src="./images/Logo.png" alt="Logo" />
					</Link>*/}
				</div>
				<div className="flex-center nav-link">
					<ul>
						<li>
							<NavLink to="/">Home</NavLink>
						</li>
						{/*<li>
							<NavLink to="/expert-solution">Expert Solutions</NavLink>
						</li>*/}
						<li>
							<NavLink to="/fileupload">Card Upload</NavLink>
						</li>
						<li>
							<NavLink to="/company">Company Info</NavLink>
						</li>
													
						<li>	<NavLink to="/companyinfo">Company Administration</NavLink>
								
							{/*<button >Company Administration</button>
							{...buttonProps}<div className={isOpen ? 'visible' : ''} role='menu'>
								<a {...itemProps[0]} href=''>Commendations</a>
								<a {...itemProps[1]} href=''>File Upload</a>
								<a {...itemProps[2]} href=''>Add Company</a>
								<a {...itemProps[3]} href=''>Edit Company</a><NavLink to="/dropdownmenu">Company Administration</NavLink>

							</div> */}							
						</li>

						 <li>
							<LoginMenu></LoginMenu>   {/* <NavLink to="/companyinfo">Company Administration</NavLink>*/}
						</li>

					</ul>

					<ul>
						<li>
							<a href="https://ca.linkedin.com" target="_blank" rel="noreferrer">
								<img src="./images/LinkedInLogo.png" alt="Logo" />
							</a>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
};
