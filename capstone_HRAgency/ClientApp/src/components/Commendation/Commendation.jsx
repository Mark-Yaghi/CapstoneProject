import React, { useEffect, useState } from "react";
import { LoginMenu } from "../api-authorization/LoginMenu";
// import { NavLink } from "react-router-dom";
import authService from "../api-authorization/AuthorizeService";
import CardSelect from "./CardSelect";
import "./Commendation-Style.css";
import { CommendationForm } from "./CommendationForm";

const Commendation = () => {
	const [userSelImg, setUserSelImg] = useState({ id: "", image: "" });
	const [userInfo, setUserInfo] = useState({ userName: null, isAuthenticated: false });

	// ----- Authentication and UserName ------ //

	useEffect(() => {
		const userInfomation = async () => {
			const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()]);
			setUserInfo({ userName: user && user.name, isAuthenticated });
		};
		userInfomation();
	}, []);

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
				<h3>
					Welcome, <span className="heading-card">{userInfo.userName}</span>
				</h3>
				<div className="flex-center">
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
