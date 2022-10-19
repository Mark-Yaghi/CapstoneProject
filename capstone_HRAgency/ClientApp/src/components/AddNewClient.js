import React, { Component } from "react";
// import { LoginMenu } from "../api-authorization/LoginMenu";
import { LoginMenu } from "../components/api-authorization/LoginMenu";
import AddNewClient from "./AddNewClient/AddNewClient";


export class AddNewClient extends Component {
	static displayName = AddNewClient.name;

	render() {
		return (
			<>
				<AddNewClient />
			</>
		);
	}
}