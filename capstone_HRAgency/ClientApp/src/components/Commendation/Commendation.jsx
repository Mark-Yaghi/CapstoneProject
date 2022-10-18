import React, { useEffect, useState } from "react";
import { LoginMenu } from "../api-authorization/LoginMenu";
import { Link, NavLink } from "react-router-dom";
import authService from "../api-authorization/AuthorizeService";
import CardSelect from "./CardSelect";

import "./Commendation-Style.css";
import { CommendationForm } from "./CommendationForm";

const Commendation = () => {
	const [userInfo, setUserInfo] = useState(null);

	console.log(authService.isAuthenticated());
	useEffect(() => {
		const userInfomation = async () => {
			const user = await Promise(authService.getUser());
			setUserInfo(user);
		};
	});

	return (
		<>
			<section className="main-container flex-center flex-option">
				<h3>Welcome, {}</h3>
				<div className="flex-center">
					<NavLink className="but-general but-col-prim" to="/authentication/register">
						Register
					</NavLink>
					<button className="but-general but-col-prim marg-left">
						<LoginMenu></LoginMenu>
					</button>
				</div>
			</section>
			<section className="bg-color-prim">
				<CardSelect />
			</section>
			<CommendationForm />
		</>
	);
};

export default Commendation;
