import React, { useEffect, useState, useRef } from "react";
import { LoginMenu } from "../api-authorization/LoginMenu";
import authService from "../api-authorization/AuthorizeService";
import CardSelect from "./CardSelect";
import "./Commendation-Style.css";
import { CommendationForm } from "./CommendationForm";
//import { useNavigate } from "react-router-dom";


const Commendation = () =>
{
	const [userSelImg, setUserSelImg] = useState({ id: "", image: "" });
	const [isTrue, setIsTrue] = useState(false);
	const [userInfo, setUserInfo] = useState({ userName: null, isAuthenticated: false });
	const imageRef = useRef();

	//const navigate = useNavigate(); 

	// ----- Authentication and UserName ------ //

	useEffect(() => {
		const userInfomation = async () => {
			const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()]);
			setUserInfo({ userName: user && user.name, isAuthenticated });
		};
		userInfomation();
	}, []);

	useEffect(() => {
		if (isTrue) {
			imageRef.current.scrollIntoView({
				behavior: "smooth",
			});
		}
	}, [isTrue]);

	//The function below is supposed to query the endpoint "status" and get the company's SubscriptionStatus. If active, allow access to the Appreciation/Commendation page; if not, then either a) redirect to a dead page telling them to contact their company rep; or b), put out an alert, the redirect to the login(?) page. Still under development. 

	/*useEffect(() => {

		const checkStatus = async () =>
			{

				let urlParams = { emailVerify: userInfo };

				const resp = await fetch(`api/registeredit/status?` + new URLSearchParams(urlParams), {
					method: "GET"
				});

				if (!resp.ok)    //if we get a good response, send out a message letting the user know.
				{
					alert("The company's Subscription Status is Inactive.");
					navigate("/login", { replace: true });
				};
			}
			checkStatus();
		}, []); 	*/

	const imageSelectInfo = (selectedImage) => {
		const { id, image } = selectedImage;
		setUserSelImg((prev) => ({ ...prev, id, image }));
	};

	const formValues = (inputValues) => {
		console.log(inputValues);
	};

	const resetImage = () => {
		setUserSelImg({ id: "", image: "" });
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
				<h4 ref={imageRef} className="img-sel-scroll">
					{isTrue && "Please Select an Image"}
				</h4>
				<CardSelect onSelectImage={imageSelectInfo} />
			</section>
			<CommendationForm onFormInformation={formValues} userImage={userSelImg} setIsTrue={setIsTrue} resetMethod={resetImage} />
		</>
	);
};

export default Commendation;
