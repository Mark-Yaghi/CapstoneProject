import React, { Component } from "react";

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
