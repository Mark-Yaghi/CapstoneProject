import React from "react";
import { LoginMenu } from "../api-authorization/LoginMenu";
import CardSelect from "./CardSelect";

import "./Commendation-Style.css";

const Commendation = () => {
	return (
		<>
			<section className="main-container flex-center flex-option">
				<h3>Welcome, User Name</h3>
				<button className="but-general but-col-prim">
					<LoginMenu></LoginMenu>
				</button>
			</section>
			<section className="bg-color-prim">
				<CardSelect />
			</section>
		</>
	);
};

export default Commendation;
