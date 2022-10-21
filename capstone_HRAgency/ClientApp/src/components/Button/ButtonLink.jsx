import React from "react";
import { LoginMenu } from "../api-authorization/LoginMenu";
import { NavLink } from "react-router-dom";

const ButtonLink = () => {
	return (
		<section className="main-container flex-center flex-option  flex-right">
			<div className="flex-center">
				<NavLink className="but-general but-col-prim" to="/">
					Commendations
				</NavLink>
				<NavLink className="but-general but-col-prim marg-left" to="/addClient">
					Add New Client
				</NavLink>
				<NavLink className="but-general but-col-prim marg-left" to="/editClient">
					Edit Client
				</NavLink>
				{/* <button className="but-general but-col-prim marg-left">
					<LoginMenu></LoginMenu>
				</button>*/}
			</div>
		</section>
	);
};

export default ButtonLink;
