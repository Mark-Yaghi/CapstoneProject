import React, { Component } from "react";
// import { LoginMenu } from "../api-authorization/LoginMenu";
import Commendation from "./Commendation/Commendation";
import AddNewClient from "./AddNewClient/AddNewClient";
import EditClient from './EditClient/EditClient';

export class Home extends Component {
	static displayName = Home.name;

	render() {
		return (
			<>
				<AddNewClient />
				<EditClient />
				<Commendation />
			</>
		);
	}
}
