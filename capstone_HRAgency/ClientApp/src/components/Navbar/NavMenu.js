import React from "react";
import { NavLink } from "react-router-dom";
import { LoginMenu } from "../api-authorization/LoginMenu";
import "./NavMenu.css";

export const NavMenu = () => {
	return (
		<header className="navbar">
			<nav className="flex-center nav-container">
				<div>
					<a href="https://www.thehragency.ca/">
						<img alt="Go Back to Home Page" src="./images/Logo.png"></img>
					</a>
				</div>
				<div className="flex-center nav-link">
					<ul>
						<li>
							<div class="dropdown">
								<button class="dropbtn">Admin Panel</button>
								<div class="dropdown-content">
									<a href='/'>Appreciations</a>
									<a href='/fileupload'>Card Upload</a>
									<a href='/addClient'>Add New Client</a>
									<NavLink to="/company">Client Info</NavLink>
									<a href='/authentication/register'>Register</a>
									<LoginMenu></LoginMenu>
								</div>
							</div>
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
