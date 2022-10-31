import React from "react";
import { NavLink } from "react-router-dom";
import { LoginMenu } from "../api-authorization/LoginMenu";
//import useDropdownMenu from 'react-accessible-dropdown-menu-hook';

import "./NavMenu.css";

//@model IEnumerable < Microsoft.AspNet.Identity.EntityFramework.IdentityRole >

export const NavMenu = () => {
	return (
		<header className="navbar">
			<nav className="flex-center nav-container">
				<div>
					<a href="https://www.thehragency.ca/" target="_blank">
						<img alt="Go Back to Home Page" src="./images/Logo.png" />
					</a>
				</div>
				<div className="flex-center nav-link">
					<ul>
						<li>
							<div className="dropdown">
								<button className="dropbtn">Admin Panel</button>
								<div className="dropdown-content">
									<a href="/">Appreciations</a>
									<a href="/fileupload">Card Upload</a>
									<a href="/addClient">Add New Client</a>
									<NavLink to="/company">Client Info</NavLink>
									<a href="/authentication/register">Register</a>
									<LoginMenu></LoginMenu>
								</div>
							</div>
						</li>
					</ul>

					<ul>
						<li>
							<a href="https://www.linkedin.com/company/uniquely-you-hr/" target="_blank" rel="noreferrer">
								<img src="./images/LinkedInLogo.png" alt="Logo" />
							</a>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
};
