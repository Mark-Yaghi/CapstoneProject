import React, { Component } from "react";
// import { LoginMenu } from "../api-authorization/LoginMenu";
import { LoginMenu } from "../components/api-authorization/LoginMenu";
import EditClient from './EditClient/EditClient';


export class EditClient extends Component {
	static displayName = AddNewClient.name;

	render() {
		return (
			<>
				<EditClientform />
			</>
		);
	}
}