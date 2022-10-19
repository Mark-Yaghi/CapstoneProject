import React from "react";
import { LoginMenu } from "../api-authorization/LoginMenu";
import "./EditClient-Style.css";
import { EditClientForm } from "./EditClientForm";

const EditClient = () => {
	return (
		<>
			<section className="main-container flex-center flex-option">
				<h3>Welcome, User Name</h3>
				<button className="but-general but-col-prim">
					<LoginMenu></LoginMenu>
				</button>
			</section>
			<EditClientForm />
		</>
	);
};

export default EditClient;
