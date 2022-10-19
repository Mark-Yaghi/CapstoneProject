import React, { useEffect, useState } from "react";
import { LoginMenu } from "../api-authorization/LoginMenu";
import { NavLink } from "react-router-dom";
// import authService from "../api-authorization/AuthorizeService";
import CardSelect from "./CardSelect";

import "./Commendation-Style.css";
import { CommendationForm } from "./CommendationForm";

const Commendation = () => {
	const [userSelImg, setUserSelImg] = useState({ id: "", image: "" });
	// const [userInfo, setUserInfo] = useState({ userName: "" });

	// console.log(authService.isAuthenticated());
	// useEffect(() => {
	// 	const userInfomation = async () => {
	// 		const user = await Promise.all(authService.getUser());
	// 		setUserInfo((prev) => ({ ...prev, userName: user && user.name }));
	// 	};
	// 	userInfomation();
	// });
	const imageSelectInfo = (selectedImage) => {
		const { id, image } = selectedImage;
		setUserSelImg((prev) => ({ ...prev, id, image }));
	};

	const formValues = (inputValues) => {
		console.log(inputValues);
	};

	return (
		<>
			<section className="main-container flex-center flex-option">
				<h3>Welcome, userName</h3>
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
				<CardSelect onSelectImage={imageSelectInfo} />
			</section>
			<CommendationForm onFormInformation={formValues} userImage={userSelImg} />
		</>
	);
};

export default Commendation;
