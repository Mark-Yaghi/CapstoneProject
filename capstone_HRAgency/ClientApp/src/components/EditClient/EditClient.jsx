import React from "react";
import { LoginMenu } from "../api-authorization/LoginMenu";
import ButtonLink from "../Button/ButtonLink";
import "./EditClient-Style.css";
import { EditClientForm } from "./EditClientForm";

const EditClient = () => {
	return (
		<>
			<>
				<ButtonLink />
			</>
			<EditClientForm />
		</>
	);
};

export default EditClient;
