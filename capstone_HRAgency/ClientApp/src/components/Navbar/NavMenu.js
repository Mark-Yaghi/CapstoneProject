import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { LoginMenu } from "../api-authorization/LoginMenu";
import authService from "../api-authorization/AuthorizeService";
//import useDropdownMenu from 'react-accessible-dropdown-menu-hook';

import "./NavMenu.css";

//@model IEnumerable < Microsoft.AspNet.Identity.EntityFramework.IdentityRole >

export const NavMenu = () => {
	const [isAccActive, setIsAccActive] = useState(true);

	useEffect(() => {
		const checkStatus = async () => {
			let urlParams = { emailVerify: (await authService.getUser()).email };
			// console.log(urlParams);
			// console.log(await authService.getUser());
			const resp = await fetch(`api/registeredit/status?` + new URLSearchParams(urlParams), {
				method: "GET",
			});

			if (!resp.ok) {
				//if we get a good response, send out a message letting the user know.
				// alert("The company's Subscription Status is Inactive.");
				setIsAccActive(false);
				// navigate("/authentication/login", { replace: true });
			}
		};
		checkStatus();
	}, []);

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
							{isAccActive && (
								<div className="dropdown">
									<button className="dropbtn">Admin Panel</button>
									<div className="dropdown-content">
										<a href="/">Appreciations</a>
										<a href="/fileupload">Card Upload</a>
										<a href="/addClient">Add New Client</a>
										<NavLink to="/company">Client Info</NavLink>
										<a href="/authentication/register">Register</a>
										{/* <LoginMenu></LoginMenu> */}
									</div>
								</div>
							)}
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
