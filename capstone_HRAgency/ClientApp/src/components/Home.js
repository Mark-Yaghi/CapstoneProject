import React, { Component } from "react";
// import { LoginMenu } from "../api-authorization/LoginMenu";
import { LoginMenu } from "../components/api-authorization/LoginMenu";
import Commendation from "./Commendation/Commendation";

export class Home extends Component {
	static displayName = Home.name;

	render() {
		return (
			<>
				<Commendation />
			</>
		);
	}
}
