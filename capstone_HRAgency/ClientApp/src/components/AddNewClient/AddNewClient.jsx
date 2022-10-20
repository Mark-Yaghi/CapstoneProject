import React from "react";
import { LoginMenu } from "../api-authorization/LoginMenu";
import ButtonLink from "../Button/ButtonLink";
import "./AddNewClient-Style.css";
import { AddNewClientForm } from "./AddNewClientForm";

const AddNewClient = () => {
	return (
		<>
			<>
				<ButtonLink />
			</>
			<AddNewClientForm />
		</>
	);
};

export default AddNewClient;
