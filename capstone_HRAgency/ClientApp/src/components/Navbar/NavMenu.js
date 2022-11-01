import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { LoginMenu } from "../api-authorization/LoginMenu";
//import useDropdownMenu from 'react-accessible-dropdown-menu-hook';
import authService from "../api-authorization/AuthorizeService";

import "./NavMenu.css";


export const NavMenu = () => {
    const [userInfo, setUserInfo] = useState({ userName: null, isAuthenticated: false });
    const [isAccActive, setIsAccActive] = useState(true);

    /*useEffect(() => {
        const userInfomation = async () => {
            const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()]);
            setUserInfo({ userName: user && user.name, isAuthenticated });
        };
        userInfomation();
    }, []);*/

    //The function below  queries the endpoint "status" and get the company's SubscriptionStatus. If active, allow access to the Appreciation/Commendation page; if not, then put out an alert, and then redirect to the login page. 
    useEffect(() => {
        const checkStatus = async () => {

            console.log(authService.getUser());
            let urlParams = { userVerify: (await authService.getUser()).role };
            console.log(urlParams);
            console.log(await authService.getUser());
            const resp = await fetch(`api/registeredit/user?` + new URLSearchParams(urlParams), {
                method: "GET",
            });

            if (!resp.ok) {
                //if we get a good response, send out a message letting the user know.
                // alert("The company's Subscription Status is Inactive.");

                setIsAccActive(false);       //alert replaced with onscreen text. Better solution.

                // navigate("/authentication/login", { replace: true });
            } else {
                setIsAccActive(true);
            }
        };
        checkStatus();
    }, []);

    /*################################################################################################################################################################################################################################################################### */


    //let isAdmin = true
    return
    (
       

            <header className="navbar">
                <nav className="flex-center nav-container">
                    <div>
                        <a href="https://www.thehragency.ca/">
                            <img alt="Go Back to Home Page" src="./images/Logo.png"/>
                        </a>
                    </div>

                    <div className="flex-center nav-link">

                        <ul>
                            
                               <li>
                            {isAccActive ?
                                (<div className="dropdown">
                                        <button className="dropbtn">Admin Panel</button>
                                        <div className="dropdown-content">
                                            <a href="/">Appreciations</a>
                                            <a href="/fileupload">Card Upload</a>
                                            <a href="/addClient">Add New Client</a>
                                            <NavLink to="/company">Client Info</NavLink>
                                            <a href="/authentication/register">Register</a>
                                            <LoginMenu></LoginMenu>
                                        </div>
                                  </div>) :

                                (
                                    <li>  <LoginMenu></LoginMenu></li>
                                )}
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
}
	/*return (
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
};*/
